import { execSync } from "child_process"

function renderSync(code) {
  /*
    This is a bad hack. But it was the best solution I could find:
    - https://github.com/markslides/markdown-it-mermaid
      doesn't work well:
      it uses it's own renderAll() async method which is called manually at other places
    - using an own markdown-it plugin is problematic, because it requires a sync
      function to fill the content, but mermaid only offers an async render() function.
      https://github.com/mermaid-js/mermaid/issues/4741
      https://github.com/markdown-it/markdown-it/blob/master/docs/development.md#i-need-async-rule-how-to-do-it
      using deasync deadlocks.

    So creating a sub-process here is very heavy, but works reliable at least.
  */

  return execSync("npx mmdc --outputFormat=svg --input=- --output=-", {
    input: code
  })
}

export default function markdownItMermaid(md, options = {}) {
  const regex = /^```mermaid(\{([^}]*)\})?/
  const closeMarker = options.closeMarker || "```"
  const closeChar = closeMarker.charCodeAt(0)

  function render(tokens, idx, _options, _env, _slf) {
    const { content, _attributes } = tokens[idx]
    return renderSync(content)
  }

  function mermaid(state, startLine, endLine, silent) {
    const firstLine = state.src.split("\n")[startLine]
    const match = firstLine.match(regex)
    let nextLine
    let i
    let autoClosed = false
    let start = state.bMarks[startLine] + state.tShift[startLine]
    let max = state.eMarks[startLine]

    if (!match) {
      return false
    }

    // Since start is found, we can report success here in validation mode
    if (silent) {
      return true
    }

    // Search for the end of the block
    nextLine = startLine

    for (; ;) {
      nextLine++
      if (nextLine >= endLine) {
        // unclosed block should be autoclosed by end of document.
        // also block seems to be autoclosed by end of parent
        break
      }

      start = state.bMarks[nextLine] + state.tShift[nextLine]
      max = state.eMarks[nextLine]

      if (start < max && state.sCount[nextLine] < state.blkIndent) {
        // non-empty line with negative indent should stop the list:
        // - ```
        //  test
        break
      }

      if (closeChar !== state.src.charCodeAt(start)) {
        // didn't find the closing fence
        continue
      }

      if (state.sCount[nextLine] > state.sCount[startLine]) {
        // closing fence should not be indented with respect of opening fence
        continue
      }

      let closeMarkerMatched = true
      for (i = 0; i < closeMarker.length; ++i) {
        if (closeMarker[i] !== state.src[start + i]) {
          closeMarkerMatched = false
          break
        }
      }

      if (!closeMarkerMatched) {
        continue
      }

      // make sure tail has spaces only
      if (state.skipSpaces(start + i) < max) {
        continue
      }

      // found!
      autoClosed = true
      break
    }

    const contents = state.src
      .split("\n")
      .slice(startLine + 1, nextLine)
      .join("\n")

    const token = state.push("mermaid", "fence", 0)
    const attributes = match[2]?.trim()
    token.attributes = attributes ? Object.fromEntries(attributes.split(" ").map(attr => attr.split("="))) : []
    token.content = contents

    state.line = nextLine + (autoClosed ? 1 : 0)

    return true
  }

  md.block.ruler.before("fence", "mermaid", mermaid, {
    alt: ["paragraph", "reference", "blockquote", "list"]
  })

  md.renderer.rules.mermaid = render
}

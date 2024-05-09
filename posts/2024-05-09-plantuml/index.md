---
title: PlantUML
date: 2024-05-09T23:00:00+02:00
thumbnail: thumbnail.png
---

Render PlantUML embedded into the markdown post file.

Using the great [orefalo/markdown-it-plantuml-ex2](https://github.com/orefalo/markdown-it-plantuml-ex2).

# Simple PlantUML diagram

```plantuml
@startuml
Bob -> Alice : hello
@enduml
```

# Themed

```plantuml
@startuml
!theme spacelab
Bob -> Alice : hello
@enduml
```

# Background color

```plantuml
@startuml
skinparam backgroundColor f0a2fd
Bob -> Alice : hello
@enduml
```

# TODO

- Improve create profile screen
- Show timelines
- Replace TypeORM with MikroORM

# Bugs
- TypeORM's @PrimaryColumn with unique = true isn't working as expected

# Done

- Move DTO types of *Bridge into their module
- Init community timelines with bridge
- Init user timelines with bridge
- Use account bridge to create account (Auth service shouldn't have a database)
- Map error from bridge response to exception
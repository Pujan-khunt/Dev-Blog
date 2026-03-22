# Pujan's Developer Blog :)

NOTE: There is no zod enforcement of a strict `slug` field in the frontmatter, yet it is HIGHLY recommended
to use one.

The `glob` file loader creates a `id` field for each `CollectionEntry` which is a URL friendly format derived
from the filename it is trying to load. To create a custom id/slug for each blog, you need to explicitly add
the `slug` field in the frontmatter.


## TODO

1. Move `data/` from local files to Astro's Content Collection to act as a Local Database.
2. Project page showcasing all projects briefly
3. static and prerendered project page for a single project
4. Create a proper favicon with monochrome color scheme.

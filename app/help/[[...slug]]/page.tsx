export default function DocsOptional({ params }) {
  return <h1>Optional Docs Path: {params.slug?.join("/") || "index"}</h1>;
}
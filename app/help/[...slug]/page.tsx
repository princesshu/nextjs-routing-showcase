export default function Docs({ params }) {
  return <h1>Docs Path: {params.slug.join("/")}</h1>;
}
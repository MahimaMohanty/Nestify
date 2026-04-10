export default function withLoader(Component) {
  return function WithLoader({ loading, ...props }) {
    if (loading) {
      return (
        <div style={{ textAlign: "center", padding: "40px", fontSize: "18px" }}>
          Loading properties...
        </div>
      );
    }

    return <Component {...props} />;
  };
}

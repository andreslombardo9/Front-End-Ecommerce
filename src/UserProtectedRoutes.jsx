function UserProtectedRoute({ children }) {
  const { loading, isAuthenticated, user } = useAuth();

  if (loading) return <h1>Loading...</h1>;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user && user.userRole === "usuario") {
    return children;
  } else {
    return <Navigate to="/error" />;
  }
}

function AdminProtectedRoute({ children }) {
  const { loading, isAuthenticated, user } = useAuth();

  if (loading) return <h1>Loading...</h1>;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user && user.userRole === "administrador") {
    return children;
  } else {
    return <Navigate to="/error" />;
  }
}

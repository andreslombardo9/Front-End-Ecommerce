import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginRequest } from "../api/auth";
import { setUser } from "../redux/authReducer";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = handleSubmit((data) => {
    dispatch(loginRequest(data))
      .then((response) => {
        console.log("Login Response:", response);

        // Verifica si la solicitud fue exitosa
        if (loginRequest.fulfilled.match(response)) {
          const user = response.payload;
          console.log("aver que sale",user);
          // Redirige según el rol del usuario
          if (user.userRole.name && user.userRole.name === "administrador") {
            navigate("/dashboardAdmin");
          } else {
            navigate("/homepage");
          }
        } else {
          console.log(errors);
        }
      })
      .catch((error) => {
       console.log(error);
      });
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center p-5">
      <div className="bg-zinc-800 w-full md:w-1/2 p-10 rounded-md">
        <h1 className="text-2xl font-bold">Iniciar Sesión</h1>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {errors.email && <p>El email es requerido</p>}

          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Contraseña"
          />
          {errors.password && <p>La contraseña es requerida</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-2 rounded"
          >
            Ingresar
          </button>
        </form>
        <p className="text-tomato-500 text-lg font-bold text-shadow py-3 text-center">
          Crear cuenta en 2 pasos{" "}
          <Link
            className="text-blue-500 hover:text-blue-700 underline"
            to="/register"
          >
            Registrarme
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;

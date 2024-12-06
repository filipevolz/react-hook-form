import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";

import '../../style/global.scss';
import { useState } from "react";

const loginUserFormSchema = z.object({
  email: z.string()
  .nonempty("O e-mail é obrigatório")
  .email("Formato de e-mail inválido")
  .toLowerCase(),
  password: z.string()
  .min(6, "A senha tem no mínimo 6 caracteres")
})

type LoginUserFormData = z.infer<typeof loginUserFormSchema>

export function LoginUserForm() {
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<LoginUserFormData>({
    resolver: zodResolver(loginUserFormSchema),
  })

  async function handleLogin(data: LoginUserFormData) {
    setErrorMessage("");
    try {
      const response = await fetch("https://67526038d1983b9597b604b3.mockapi.io/users");
      if (!response.ok) {
        throw new Error("Erro ao acessar o servidor.");
      }

      const users = await response.json();

      // Verifica se o email e a senha correspondem
      const user = users.find(
        (user: { email: string; password: string }) =>
          user.email === data.email && user.password === data.password
      );

      if (user) {
        console.log("Login bem-sucedido:", user);
        navigate("/dashboard"); // Redireciona para a página principal
      } else {
        setErrorMessage("E-mail ou senha inválidos.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Ocorreu um erro no login. Tente novamente.");
    }
  }

  return(
    <div className="main">
      <form onSubmit={handleSubmit(handleLogin)} className="form">
        <div className="inputForm">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            placeholder="exemplo@exemplo.com"
            {...register("email")}
          />          
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div className="inputForm">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            {...register("password")}
          />          
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <div className="buttons">
          <button
            children="Login"
            type="submit"
            className="loginButton"
          />
          {errorMessage && <span>{errorMessage}</span>}

          <span>OU</span>

          <button
            children="Cadastre-se"
            type="button"
            className="signupButton"
            onClick={() => navigate("/signup")}
          />
        </div>
      </form>
    </div>
  )
}
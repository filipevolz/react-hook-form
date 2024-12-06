import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";

import '../../style/global.scss';

const createUserFormSchema = z.object({
  name: z.string()
  .nonempty("O nome é obrigatório")
  .transform(name => {
    return name.trim().split(' ').map(word => {
      return word[0].toLocaleUpperCase().concat(word.substring(1))
    }).join(' ')
  }),
  email: z.string()
  .nonempty("O e-mail é obrigatório")
  .email("Formato de e-mail inválido")
  .toLowerCase(),
  password: z.string()
  .min(6, "A senha precisa de no mínimo 6 caracteres")
})

type CreateUserFormData = z.infer<typeof createUserFormSchema>

export function CreateUserForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [output, setOutPut] = useState("")
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  })

  async function handleCreateUser(data: CreateUserFormData) {
    setIsSubmitting(true);
    try {
      const response = await fetch("https://67526038d1983b9597b604b3.mockapi.io/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar usuário");
      }

      const result = await response.json();
      console.log("Usuário criado:", result);
      setOutPut(JSON.stringify(result, null, 2));
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar os dados. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }
  

  return(
    <div className="main">
      <form onSubmit={handleSubmit(handleCreateUser)} className="form">
        <div className="inputForm">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            placeholder="Filipe Volz"
            {...register("name")}
          />
          {errors.name && <span>{errors.name.message}</span>}          
        </div>

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
            children={isSubmitting ? "Salvando..." : "Salvar"}
            type="submit"
            className="saveButton"
            disabled={isSubmitting}
          />

          <span>OU</span>

          <button
            children="Login"
            type="button"
            className="loginButton"
            onClick={() => navigate("/react-hook-form")}
          />
        </div>
      </form>

      <pre>
        {output}
      </pre>
    </div>
  )
}
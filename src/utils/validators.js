import moment from "moment/moment";
import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Correo inválido")
        .required("El correo es obligatorio"),
    password: Yup.string()
        .min(6, "La contraseña debe tener al menos 8 caracteres")
        .required("La contraseña es obligatoria"),
});

export const registerValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Correo inválido")
        .required("El correo es obligatorio"),
    discord: Yup.string().required("Ingrese su usuario de Discord"),
    nombre: Yup.string()
        .min(3, "El nombre debe tener mínimo 3 letras")
        .required("El nombre es obligatorio"),
    password: Yup.string()
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/,
            "La contraseña debe incluir mayúsculas, minúsculas y un carácter especial"
        )
        .required("Requerido"),
    fechaNacimiento: Yup.string()
        .test("valid-date", "Formato inválido, tiene que ser DD/MM/YYYY", (value) => {
            if (!value) return false;
            return moment(value, "DD/MM/YYYY", true).isValid();
        })
        .required("Se requiere fecha de nacimiento"),
    nacionalidad: Yup.string().required("La nacionalidad es obligatoria"),
    aceptoTerminos: Yup.boolean()
        .oneOf([true], "Debe aceptar los términos y condiciones"),
});

export const editMyProfileSchema = Yup.object().shape({
    nombre: Yup.string().required("El nombre es obligatorio"),
    discord: Yup.string().required("El apellido es obligatorio"),
    fechaNacimiento: Yup.string()
        .test("valid-date", "Formato inválido, tiene que ser DD/MM/YYYY", (value) => {
            if (!value) return false;
            return moment(value, "DD/MM/YYYY", true).isValid();
        })
        .required("Se requiere fecha de nacimiento"),
    nacionalidad: Yup.string().required("La nacionalidad es obligatoria"),
  });
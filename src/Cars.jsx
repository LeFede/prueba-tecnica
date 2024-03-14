import { useState } from "react";
import toast from "react-hot-toast";

const apiKey =
  "patJiiqIZNEW4FtGr.24f9ec4e8c76cd844ae0598c3b7bce856e539c7ec2462f8b2ffec6e2535cfe27";
const baseId = "app3Pyxut69TI3X9D";
const tableId = "tblyyhxitP3K9zkOZ";

const url = `https://api.airtable.com/v0/${baseId}/${tableId}`;
const headers = {
  Authorization: `Bearer ${apiKey}`,
  "Content-Type": "application/json",
};

const defaultValues = {
  name: "",
  model: "",
  price: "",
};

const defaultErrors = {
  name: "",
  model: "",
  price: "",
};

const errorHandlers = {
  name: (input) => {
    if (!input) return "El nombre es requerido";
    return false;
  },
  model: (input) => {
    if (!input) return "El modelo es requerido";
    return false;
  },
  price: (input) => {
    if (!input) return "El precio es requerido";
    if (Number.isNaN(+input)) return "El precio debe ser un numero!";
    return false;
  },
};

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState(defaultValues);
  const [errors, setErrors] = useState(defaultErrors);

  const handleErrors = (name, value) => {
    const error = errorHandlers[name](value);

    if (error) {
      setErrors((prev) => {
        return { ...prev, [name]: error };
      });
    } else {
      setErrors((prev) => {
        return { ...prev, [name]: "" };
      });
    }
  };

  const handleInputs = (e) => {
    const { name, value } = e.target;

    handleErrors(name, value);

    setInputs((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleFetch = async () => {
    setLoading(true);
    try {
      const res = await fetch(url, {
        headers,
      });

      const data = await res.json();

      const newData = data.records.map((e) => e.fields);
      setCars(newData);
    } catch (err) {
      console.error("Hubo un error consultando la base de datos: ", err);
      toast.error("Hubo un error consultando los autos");
    } finally {
      setLoading(false);
    }
  };

  const checkAllErrors = () =>
    Object.values(errors).some((e) => Boolean(e)) ||
    Object.values(inputs).every((e) => !e);

  const updatePostedCar = async (recordId) => {
    setLoading(true);

    try {
      const res = await fetch(`${url}/${recordId}`, {
        headers,
      });

      const data = await res.json();

      setCars((prev) => [...prev, data.fields]);
    } catch (err) {
      console.error(
        "Hubo un error al actualizar el listado con el nuevo auto: ",
        err,
      );
      toast.error("Hubo un error al actualizar el listado con el nuevo auto");
    } finally {
      setLoading(false);
    }
  };

  const postCar = async (e) => {
    e.preventDefault();
    setLoading(true);
    Object.entries(inputs).forEach(([name, value]) =>
      handleErrors(name, value),
    );

    if (checkAllErrors()) {
      setLoading(false);

      return toast.error("Hay errores en el formulario");
    }

    try {
      const body = JSON.stringify({
        fields: {
          Nombre: inputs.name.trim(),
          Precio: +inputs.price,
          Modelo: inputs.model.trim(),
        },
      });

      const res = await fetch(url, {
        method: "POST",
        headers,
        body,
      });

      const data = await res.json();
      setInputs(defaultValues);
      updatePostedCar(data.id);
      toast.success("Auto agregado correctamente");
      setLoading(false);
    } catch (err) {
      console.error("Hubo un error al crear el auto: ", err);
      toast.error("Hubo un error al crear el auto");
    }
  };

  const handleClick = () => {
    handleFetch();
  };

  return (
    <>
      <button onClick={handleClick} disabled={loading}>
        {loading ? "loading..." : "Fetch!"}
      </button>

      <form>
        <fieldset>
          <legend>New car</legend>
          <input
            value={inputs.name}
            onChange={handleInputs}
            required
            name="name"
            placeholder="Name"
          />
          <span>{errors.name || ""}</span>
          <input
            value={inputs.model}
            onChange={handleInputs}
            name="model"
            required
            placeholder="Model"
          />
          <span>{errors.model || ""}</span>
          <input
            value={inputs.price}
            onChange={handleInputs}
            name="price"
            required
            placeholder="Price"
          />
          <span>{errors.price || ""}</span>
        </fieldset>
        <input type="submit" onClick={postCar} disabled={loading} value="Add" />
      </form>

      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Nombre</th>
            <th>Modelo</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((e) => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.Nombre}</td>
              <td>{e.Modelo}</td>
              <td>{e.Precio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

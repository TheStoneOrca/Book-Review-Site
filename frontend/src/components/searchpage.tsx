import { useForm } from "react-hook-form";
import { useParams, useSearchParams } from "react-router-dom";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("q");

  const { register, handleSubmit } = useForm();

  const onSubmit = (formData: any) => {
    setSearchParams({ q: formData.query });
  };

  if (queryParam) {
    return <h1>{queryParam}</h1>;
  } else {
    return (
      <div>
        <h1>Search for a book now!</h1>
        <form onSubmit={() => handleSubmit(onSubmit)}>
          <input {...register("query")} />
          <button>submit</button>
        </form>
      </div>
    );
  }
}

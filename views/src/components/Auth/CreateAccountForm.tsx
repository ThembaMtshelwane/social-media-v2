import { FormEvent } from "react";
import { useUser } from "../../api/users";
import { User } from "../../definitions";
import { useNavigate } from "react-router-dom";

const CreateAccountForm: React.FC = () => {
  const { createUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newUser = Object.fromEntries(formData.entries()) as unknown as User;

    const res = await createUser(newUser);

    if (res?.success) {
      navigate("/index");
    } else {
      console.error("Failed to create account:");
    }
  };

  return (
    <section className="sm:w-[90%] w-full mx-auto ">
      <h1 className="text-4xl mb-5 font-semibold">Create your account</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-8  mx-auto border-red-400"
      >
        <div className=" flex flex-col sm:flex-row gap-2 w-full ">
          <input
            type="text"
            name="firstName"
            required
            placeholder="First Name"
          />
          <input type="text" name="lastName" required placeholder="Last Name" />
        </div>

        <input type="text" name="username" required placeholder="Username" />
        <input type="email" name="email" required placeholder="Email Address" />
        <input
          type="password"
          name="password"
          required
          placeholder="Password"
        />
        <input
          type="password"
          name="confirmPassword"
          required
          placeholder="Confirm Password"
        />
        <input type="date" name="DOB" required />

        <button className="bg-accent text-primary">Sign Up</button>
      </form>
    </section>
  );
};

export default CreateAccountForm;

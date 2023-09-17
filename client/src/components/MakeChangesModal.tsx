import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Modal } from "react-bootstrap";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

interface Props {
  handleClose: () => void;
  title: string;
  body: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
}
const schema = z.object({
  username: z.string().min(5).max(50),
});

type SignUpFormData = z.infer<typeof schema>;

const MakeChangesModal = ({ handleClose, title, body, setUser }: Props) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FieldValues) => {
    setUser(data.username);
    reset();
    handleClose();
    console.log(data.username);
  };

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                {...register("username")}
                id="username"
                type="text"
                className="form-control"
                placeholder="enter username"
              />
              {errors.username && (
                <p className="text-danger">{errors.username.message}</p>
              )}
            </div>
            {/* {error && (
        <Alert key="danger" variant="danger">
          {error}
        </Alert>
      )} */}
            <div className="d-grid">
              <button className="btn btn-primary mb-3">Set Username</button>
              <Button
                variant="outline-danger"
                onClick={() => {
                  navigate(`/`);
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </>
      </Modal.Footer>
    </Modal>
  );
};

export default MakeChangesModal;

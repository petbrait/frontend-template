import router from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Input from "@/components/Input";
import LoadingButton from "@mui/lab/LoadingButton";
import ModalInfoToken from "@/components/ModalInfoToken";
import { UseUsers } from "@/core/api";
import { updateToken } from "@/api/actions";
import { USER } from "@/constants/user";

const Wrapper = styled(Box)`
  background: radial-gradient(
    circle,
    rgba(148, 66, 226, 0.15) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  height: calc(100vh - 0px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled(Box)`
  width: 400px;
`;

const Header = styled(Box)`
  text-align: center;
`;

const ContentAvatar = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const Field = styled(Box)`
  margin: 15px 0;
  & label {
    display: block;
    margin-bottom: 5px;
    font-size: 12.5px;
    font-weight: 500;
    font-family: "Poppins";
  }
  & small {
    display: block;
    margin-top: 5px;
    font-size: 10.5px;
    color: #1d1d1d;
    cursor: pointer;
  }
`;

const Main = styled(Box)`
  margin-top: 20px;
  padding: 20px;
  border-radius: 4px;
  backdrop-filter: blur(135px);
  background-color: rgba(247, 247, 242, 0.24);
  box-shadow: 0 0px 32px -2px rgba(0, 0, 0, 0.1),
    0 8px 0px -2px rgba(0, 0, 0, 0);
`;

const Index = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { users, isLoading } = UseUsers();

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = (dataForm: any) => {
    setLoading(true);
    updateToken(dataForm?.token)
      .then((res) => {
        console.log("Token Actualizado");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box>
      <Box sx={{ position: "absolute", top: 20, left: 40 }}>
        <Button onClick={() => router.push("/home")}>Back</Button>
      </Box>
      <Wrapper>
        <Content>
          <Header>
            <ContentAvatar>
              <Avatar
                src={users?.avatar_url}
                sx={{
                  width: 90,
                  height: 90,
                  bgcolor: "#AA77FF",
                  color: "#fff",
                }}
              />
            </ContentAvatar>
            <h2>{users?.name}</h2>
            <small>@{users?.login}</small>
          </Header>
          <Main>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Field>
                <label>Personal access token</label>
                <Input
                  type="password"
                  register={register}
                  errors={errors}
                  keyName="token"
                  placeholder="Paste token"
                  value={watch("token") || USER?.TOKEN}
                />
                <small role="button" onClick={handleOpen}>
                  How do I get it?
                </small>
              </Field>
              <LoadingButton
                type="submit"
                sx={{
                  color: "#fff",
                }}
                size="small"
                loading={loading}
                variant="contained"
              >
                <span>Save</span>
              </LoadingButton>
            </form>
          </Main>
        </Content>
        <ModalInfoToken open={open} handleClose={handleClose} />
      </Wrapper>
    </Box>
  );
};

export default Index;

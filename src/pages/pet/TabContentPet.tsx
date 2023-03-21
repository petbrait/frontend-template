import { useState } from "react";
import styled from "styled-components";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Diagnosis from "./Diagnosis/Index";
import Notes from "./Notes/Index";
import Bookings from "./Bookings/Index";

const WrapperTab = styled(Box)`
  background-color: #ebe9ff;
  padding: 20px;
  border-radius: 10px;
`;

const ContentTab = styled(Box)`
  margin-top: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
`;

interface tabProps {
  active: boolean;
}

const Tab = styled(Button)<tabProps>`
  background-color: ${({ active }) =>
    active ? "#A3A1FB" : "transparent"} !important;
  color: ${({ active }) => (active ? "#fff" : "default")} !important;
`;

const Index = () => {
  const tabs = [
    {
      index: 1,
      label: "Diagnostico",
    },
    {
      index: 2,
      label: "Medicamentos",
    },
    {
      index: 3,
      label: "Notas",
    },
    {
      index: 4,
      label: "Citas",
    },
  ];

  const [tab, setTab] = useState(1);

  return (
    <Box>
      <WrapperTab>
        <Stack direction="row" spacing={2}>
          {tabs.map(({ index, label }) => (
            <Tab
              active={tab === index ? true : false}
              onClick={() => setTab(index)}
            >
              {label}
            </Tab>
          ))}
        </Stack>
      </WrapperTab>
      <ContentTab>
        {tab === 1 && <Diagnosis />}
        {tab === 3 && <Notes />}
        {tab === 4 && <Bookings />}
      </ContentTab>
    </Box>
  );
};

export default Index;
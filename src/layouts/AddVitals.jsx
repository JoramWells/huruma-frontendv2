/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { useAddAppointmentMutation } from '../api/appointments.api';

const AddVitals = () => {
  const [vitalValues, setVitalValues] = useState({
    temperature: '',
    pulse_rate: '',
    respiratory_rate: '',
    systolic: '',
    diastolic: '',
    weight: '',
    height: '',
    bmi: '',
    sp02: '',
  });

  const navigate = useNavigate();

  const [addAppointment, { isLoading, error }] = useAddAppointmentMutation();

  const [searcParams] = useSearchParams();
  // const patientId = searcParams.get('patient_id');

  const { id: patientId } = useParams();

  const inputValues = {
    patientId,
    ...vitalValues,
  };

  return (
    <VStack
      w="full"
      h="100vh"
      alignItems="center"
      justifyContent="center"
      bgColor="gray.50"
      mt="40px"
    >
      <Box
        w="50%"
        bgColor="white"
        // boxShadow="lg"
        p={5}
        rounded="lg"
        border="1px"
        borderColor="gray.200"
      >
        <HStack w="full" justifyContent="space-between">
          <IconButton onClick={() => navigate('/admin-departments')}>
            <FaArrowLeft />
          </IconButton>
          <Text fontSize="xl" fontWeight="semibold" color="gray.500">
            Add Vital Signs
          </Text>
        </HStack>
        {/* sub item */}
        <FormControl mt={5}>
          <FormLabel fontSize="lg">Temperature (°C)</FormLabel>
          <Input
            size="lg"
            placeholder="Enter Temperature"
            // value={temperature}
            onChange={(e) => setVitalValues({ ...vitalValues, temperature: e.target.value })}
          />
        </FormControl>

        {/* item code prefix */}
        <FormControl mt={5}>
          <FormLabel fontSize="lg">Pulse Rate (BPMs)</FormLabel>
          <Input
            size="lg"
            placeholder="Enter Pulse Rate"
            // value={pulse_rate}
            onChange={(e) => setVitalValues({ ...vitalValues, pulse_rate: e.target.value })}
          />
        </FormControl>

        <FormControl mt={5}>
          <FormLabel fontSize="lg">Respiratory Rate</FormLabel>
          <Input
            size="lg"
            placeholder="Enter Respiratory Rate"
            // value={respiratory_rate}
            onChange={(e) => setVitalValues({ ...vitalValues, respiratory_rate: e.target.value })}
          />
        </FormControl>

        <HStack w="full">
          <FormControl mt={5}>
            <FormLabel fontSize="lg">Systolic Rate (mmHg)</FormLabel>
            <Input
              size="lg"
              placeholder="Enter Systolic Rate"
              // value={systolic}
              onChange={(e) => setVitalValues({ ...vitalValues, systolic: e.target.value })}
            />
          </FormControl>
          <FormControl mt={5}>

            <FormLabel fontSize="lg">Diastolic value (mmHg)</FormLabel>
            <Input
              size="lg"
              placeholder="Enter Diastolic value"
              // value={diastolic}
              onChange={(e) => setVitalValues({ ...vitalValues, diastolic: e.target.value })}
            />
          </FormControl>

        </HStack>
        <HStack w="full">
          <FormControl mt={5}>

            <FormLabel fontSize="lg">Weight (Kg)</FormLabel>
            <Input
              size="lg"
              placeholder="Enter Weight"
              // value={weight}
              onChange={(e) => setVitalValues({ ...vitalValues, weight: e.target.value })}
            />
          </FormControl>
          <FormControl mt={5}>

            <FormLabel fontSize="lg">Height (m)</FormLabel>
            <Input
              size="lg"
              placeholder="Enter Height"
              // value={height}
              onChange={(e) => setVitalValues({ ...vitalValues, height: e.target.value })}
            />
          </FormControl>
        </HStack>

        <FormControl mt={5}>

          <FormLabel fontSize="lg">BMI (Kg/m²)</FormLabel>
          <Input
            size="lg"
            placeholder="Enter BMI"
            // value={bmi}
            onChange={(e) => setVitalValues({ ...vitalValues, bmi: e.target.value })}
          />
        </FormControl>
        <FormControl mt={5}>

          <FormLabel fontSize="lg">SP02 (%)</FormLabel>
          <Input
            size="lg"
            placeholder="Enter SP02"
            // value={sp02}
            onChange={(e) => setVitalValues({ ...vitalValues, sp02: e.target.value })}
          />
        </FormControl>

        <HStack mt={5} w="full" justifyContent="end">
          <Button
            size="md"
            colorScheme="blue"
            onClick={() => addAppointment(inputValues)}
          >
            {isLoading ? 'loading' : 'Save'}
          </Button>
        </HStack>
      </Box>
    </VStack>
  );
};

export default AddVitals;

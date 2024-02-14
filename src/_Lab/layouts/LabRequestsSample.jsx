/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

import {
  Avatar,
  Button,
  FormControl, FormLabel, HStack, IconButton, Input, Text,
  VStack, useToast,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useParams, useSearchParams } from 'react-router-dom';
import moment from 'moment/moment';
import BreadCrumbNav from '../../components/BreadCrumbNav';
import { useGetAllMedicationQuery } from '../../_Medication/api/medication.api';
import { useGetAllMedicationCategoryQuery } from '../../_Medication/api/medicationCategory.api';
// import { useAddInternalPharmacyRequestMutation } from '../api/internalPharmacyRequest.api';
import { useAddPersonalAccountChargeMutation } from '../../api/personalAccountCharges.api';
import { useGetPatientQuery } from '../../api/patients.api';
import CustomInput from '../../components/Forms/CustomInput';
import CustomSelect from '../../components/Forms/CustomSelect';
import { useGetAllPriceListItemsQuery } from '../../api/pricelListItems.api';

const LabRequestsSample = () => {
  const { id } = useParams();
  const { data } = useGetAllMedicationQuery();
  const [medication, setMedication] = useState({
    value: '',
    label: '',
    category: '',
    cost: 0,
  });
  const [category, setCategory] = useState('');
  const [measuringUnit, setMeasuringUnit] = useState('');
  const [cost, setCost] = useState(medication?.cost);
  const [quantity, setQuantity] = useState(0);
  const [prescriptionQuantity, setPrescriptionQuantity] = useState(0);
  const [prescription, setPrescription] = useState(0);
  const [department, setDepartment] = useState('');
  const [noOfDays, setNoOfDays] = useState('');

  const { data: medicationCategoryData } = useGetAllMedicationCategoryQuery();
  //   const [addInternalPharmacyRequest, { isLoading }] = useAddInternalPharmacyRequestMutation();

  const { data: priceListData } = useGetAllPriceListItemsQuery();

  const priceListDataOptions = useCallback(() => (priceListData?.map((item) => ({
    value: item.id, label: item.item_description,
  }))), [priceListData]);
  console.log(priceListDataOptions());

  const [addPersonalAccountCharge,
    { isLoading: isLoadingCharges }] = useAddPersonalAccountChargeMutation();

  const medicationCategoryCallback = useCallback(() => medicationCategoryData?.map((item) => ({
    value: item.category_id,
    label: item.category_name,
  })), [medicationCategoryData]);

  const medicationCallback = useCallback(() => data?.map((item) => ({
    value: item.medication_id,
    label: item.medication_name,
    category: item.medication_category?.category_name || '',
    cost: item.price,
    medicationPackaging: item?.medication_packaging_type?.package_description,
  })), [data]);

  const departmentOptions = [
    { value: 1, label: 'LABORATORY' },
  ];

  const toast = useToast();
  const displayToast = useCallback(() => (
    toast({
      title: 'Medicine out of stock.',
      status: 'warning',
      isClosable: 'true',
      position: 'top-right',
      variant: ['subtle', 'left-accent'],
      description: 'Request sent to admin. Kindly request another medicine.',
    })
  ), [toast]);

  let medicationOptions = medicationCallback();
  const filteredMedicationOptions = useCallback(() => medicationOptions?.filter(
    (item) => item.category.toLowerCase()
      .includes(category.label?.toLowerCase()),
  ), [category, medicationOptions]);

  const categoryOptions = medicationCategoryCallback();
  medicationOptions = filteredMedicationOptions();

  const [searchParams] = useSearchParams();
  const patient_id = searchParams.get('patient_id');

  const inputValues = {
    appointment_id: id,
    patient_id,
    doctor_id: 712,
    medication_id: medication?.value,
    delivery_status: 1,
    cost: medication?.cost,
    quantity: prescriptionQuantity,
    hospital_id: 18,
    pay_status: 1,
    prescription_term: prescription?.label,
    user_id: 709,
    batch_no: 1,
    date_of_request: moment(new Date()).format('MM-DD-YYYY'),
    time_of_request: moment(new Date()).format('hh:mm:ss'),
    discharge_drug: 'NO',
    number_of_days: noOfDays,
    hospital_store_id: 1,
    date_dispensed: moment(new Date()).format('MM-DD-YYYY'),
    time_dispensed: moment(new Date()).format('hh:mm:ss'),
    is_exclusion: 'NO',
  };

  const chargesInputValues = {
    amount: cost,
    service_desc: medication?.label,
    // amount: procedure.procedure_cost,
    date_of_charge: moment(new Date()).format('MM-DD-YYYY'),
    time_of_charge: moment(new Date()).format('hh:mm:ss'),
    status: 0,
    patient_id,
    hospital_id: 18,
    quantity: prescriptionQuantity,
    appointment_id: id,
  };

  const { data: patientData } = useGetPatientQuery(id);

  useEffect(() => {
    setCategory(medication?.category);
    setMeasuringUnit(medication?.medicationPackaging);
    setCost(medication?.cost);
    if (!quantity) {
      displayToast();
    }
  }, [displayToast, medication, quantity]);

  const handleSubmit = () => {
    // addInternalPharmacyRequest(inputValues);
    addPersonalAccountCharge(chargesInputValues);
  };

  return (
    <VStack
      h="100vh"
      w="full"
      bgColor="gray.50"
      mt="65px"
      p={3}
    >
      <HStack
        w="full"
      >
        <BreadCrumbNav
          addBtn={false}
        />
        <Avatar
          name={`${patientData?.patient?.first_name} ${patientData?.patient?.last_name}`}
          size="sm"
          fontWeight="bold"
        />
      </HStack>

      <VStack
        w="70%"
        bgColor="white"
                // boxShadow="lg"
        rounded="xl"
        border="1px"
        borderColor="gray.200"
        p={3}
      >
        <HStack
          w="full"
          justifyContent="space-between"
          p={1}
          bgColor="gray.50"
          rounded="lg"
          border="1px"
          borderColor="gray.200"
        >
          <IconButton
            size="sm"
          >
            <FaArrowLeft />
          </IconButton>
          <Text
            fontSize="16px"
            fontWeight="bold"
            marginRight=".5rem"
          >
            Lab Request

          </Text>
        </HStack>
        <HStack
          w="full"
                    // spacing={2}
          alignItems="flex-start"
          justifyContent="center"
        >

          <VStack
            w="50%"
                        // bgColor="red"
            border="1px"
            spacing={6}
            p={2}
            rounded="md"
            borderColor="gray.200"
          >
            <HStack
              w="full"
            >
              <Text
                fontSize="18px"
                color="gray.700"
                fontWeight="bold"
              >
                Specimen Sample Details

              </Text>
            </HStack>
            {/* <Divider /> */}
            {/*  */}
            <CustomSelect
              label="Specimen Type"
            />

            {/*  */}

            <CustomSelect
              label="Result"
            />

            {/*  */}
            <CustomInput
              label="Input"
              value={measuringUnit}
              onChange={setMeasuringUnit}
            />

            {/*  */}
            <FormControl>
              <FormLabel
                fontSize="14px"
                // fontWeight="bold"
              >
                Upload File
              </FormLabel>
              <Input
                type="file"

              />
            </FormControl>

          </VStack>

          {/*  */}
          <VStack
            w="50%"
            bgColor="white"
            spacing={6}
            border="1px"
            borderColor="gray.200"
            p={2}
            rounded="md"
          >
            <HStack
              w="full"
            >
              <Text
                fontSize="18px"
                color="gray.700"
                fontWeight="bold"
              >
                Store Items Used

              </Text>
            </HStack>

            {/*  */}

            <CustomSelect
              label="Cost Center"
              value={department}
              onChange={setDepartment}
              options={departmentOptions}
            />

            <CustomInput
              label="Store Item Insurance Number"
            />

            <CustomInput
              label="Reference"
            />

            <CustomSelect
              label="Store"
              options={departmentOptions}
            />

            <CustomSelect
              label="Select Item"
              options={priceListDataOptions()}
            />

          </VStack>
        </HStack>
        <VStack
                    // p="10px"
          w="full"
        >
          <Button
                        // bgColor="blue.500"
                        // color="white"
            colorScheme="blue"
                        // border
            w="100%"
                        // variant="outline"
            onClick={() => handleSubmit()}
          >
            {/* {isLoading ? 'loading...' : 'Save'} */}
            Save
          </Button>
        </VStack>
      </VStack>

    </VStack>
  );
};

export default LabRequestsSample;

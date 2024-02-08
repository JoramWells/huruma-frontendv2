/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import {
  FormControl, FormLabel, HStack, Input, VStack,
} from '@chakra-ui/react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { useParams } from 'react-router-dom';
import StepperNavButtons from './Nav/StepperNavButtons';
import { useGetPatientQuery } from '../../api/patients.api';

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    minHeight: '45px',
    height: '45px',
  }),
  input: (provided) => ({
    ...provided,
  }),
};

const PersonalDetail = ({
  handleNext, handleBack, activeStep, setPersonalData,
}) => {
  const residenceOptions = [
    { value: '1', label: 'Nanyuki' },
    { value: '2', label: 'Nairobi' },
  ];

  const genderOptions = [
    { value: 'MALE', label: 'MALE' },
    { value: 'FEMALE', label: 'FEMALE' },
  ];

  const initialValues = {
    first_name: '',
    last_name: '',
    middle_name: '',
    dob: '',
    email: '',
    nhif_no: '',
    patient_gender: '',
    id_number: '',
    residence: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        setPersonalData(values);
        handleNext();
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <VStack spacing={6}>

            <HStack w="full">
              <FormControl>
                <FormLabel
                  fontSize="14px"

                >
                  Out-Patient File Number

                </FormLabel>
                <Input />
              </FormControl>

              <FormControl>
                <FormLabel
                  fontSize="14px"

                >
                  Old Reference Number

                </FormLabel>
                <Input />
              </FormControl>

              <FormControl>
                <FormLabel
                  fontSize="14px"

                >
                  In-Patient File Number

                </FormLabel>
                <Input />
              </FormControl>
            </HStack>
            <HStack w="full">

              <FormControl>

                <FormLabel
                  fontSize="14px"
                  textTransform="uppercase"
                >
                  First Name

                </FormLabel>
                <Input
                  name="first_name"
                  placeholder="Enter First Name"
                  value={values.first_name}
                  onChange={handleChange}
                />

              </FormControl>

              <FormControl>

                <FormLabel
                  fontSize="14px"

                >
                  Middle Name

                </FormLabel>
                <Input
                  name="middle_name"
                  placeholder="Enter Second Name"
                  value={values.middle_name}
                  onChange={handleChange}
                />

              </FormControl>
              <FormControl>

                <FormLabel
                  fontSize="14px"
                >
                  Last Name

                </FormLabel>
                <Input
                  name="last_name"
                  placeholder="Enter Last Name"
                  value={values.last_name}
                  onChange={handleChange}
                />

              </FormControl>
            </HStack>

            {/* category */}
            <FormControl>
              <FormLabel
                fontSize="14px"

              >
                DOB

              </FormLabel>
              <Input
                name="dob"
                type="date"
                onChange={handleChange}
                value={values.dob}
              />
            </FormControl>

            {/* item code */}
            <FormControl>
              <FormLabel
                fontSize="14px"

              >
                Select Gender

              </FormLabel>
              <Select
                name="patient_gender"
                options={genderOptions}
                value={values.patient_gender}
                onChange={(val) => setFieldValue('patient_gender', val)}
              />

            </FormControl>

            <FormControl>
              <FormLabel
                fontSize="14px"

              >
                ID/Passport Number

              </FormLabel>
              <Input
                name="id_number"
                placeholder="Enter ID number"
                value={values.id_number}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel
                fontSize="14px"

              >
                Email Address

              </FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="Enter Address"
                value={values.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel
                fontSize="14px"

              >
                Select Residence

              </FormLabel>
              <Select
                name="residence"
                options={residenceOptions}
                value={values.residence}
                onChange={(opt) => setFieldValue('residence', opt)}
              />

            </FormControl>
            <FormControl>
              <FormLabel
                fontSize="14px"

              >
                NHIF Number

              </FormLabel>
              <Input
                name="nhif_no"
                value={values.nhif_no}
                onChange={handleChange}
              />
            </FormControl>

            {/* stepper navigation footer */}
            <StepperNavButtons
              handleBack={handleBack}
              activeStep={activeStep}
            />
          </VStack>

        </form>
      )}
    </Formik>
  );
};

PersonalDetail.propTypes = {
  activeStep: PropTypes.number,

  handleNext: PropTypes.func,
  handleBack: PropTypes.func,
  setPersonalData: PropTypes.func,

};

PersonalDetail.defaultProps = {
  activeStep: 1,

  handleNext: () => { },
  handleBack: () => { },
  setPersonalData: () => { },

};
export default PersonalDetail;

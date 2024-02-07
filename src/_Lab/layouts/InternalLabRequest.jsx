/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import {
  Avatar,
  Box, Button, HStack, Text, VStack,
} from '@chakra-ui/react';
// import axios from "axios"
import {
  FaBoxOpen, FaEye, FaFileDownload, FaPrint,
} from 'react-icons/fa';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import BreadCrumbNav from '../../components/BreadCrumbNav';
import DataTable2 from '../../components/tables/DataTable';
import { useGetAllInternalLabRequestsQuery } from '../../api/internalLabRequests.api';

const UserNameAvatar = ({ fullName }) => (
  <HStack>
    <Avatar
      size="sm"
      name={fullName}
      color="white"
    />
    <Text>{fullName}</Text>
  </HStack>
);

const InternalLabRequest = () => {
  const navigate = useNavigate();

  const {
    data, error, isLoading, isFetching, isSuccess,
  } = useGetAllInternalLabRequestsQuery();

  // const { data } = useSelector((state) => state.patients);
  console.log(data);

  const columns = useMemo(
    () => [
      {
        header: 'Patient Name',
        accessorKey: 'patient',
        cell: (props) => (
          <Box onClick={() => navigate(`/patient-detail/${props.row.original.patient_id}`)}>
            <UserNameAvatar
              fullName={`${props.getValue()?.first_name} ${props.getValue()?.middle_name}`}
            />
          </Box>
        ),
        size: 200,

      },
      {
        header: 'Age',
        accessorKey: 'cell_phone',
        cell: (props) => <Text>{moment().diff(moment(props.row.original.patient.dob, 'YYYY'), 'years')}</Text>,

      },
      {
        header: 'Gender',
        // accessorKey: 'patient',
        enableSorting: false,
        cell: (props) => <Text>{props.row.original.patient?.patient_gender === '1' ? 'MALE' : 'FEMALE'}</Text>,

      },
      {
        header: 'PAYMENT DETAILS',
        accessorKey: 'patient_type',
        cell: (props) => <Text>CASH</Text>,

      },
      {
        header: 'Action',
        cell: (props) => (
          <Button
            size="sm"
            color="gray.700"
            leftIcon={<FaEye />}
            onClick={() => navigate(`/internal-lab-request-detail/${props.row.original.patient_id}`)}
          >
            Tests Requested
          </Button>
        ),
      },
    ],

    [navigate],
  );

  const subRowData = data
        && data.map((item) => ({
          ...item,
          subRows: [],
        }));

  console.log(subRowData);

  return (
    <VStack
      mt="60px"
      w="full"
      bgColor="gray.50"
      p={3}
      h="95vh"
      position="relative"
    >
      <Box bgColor="white" w="full">
        <BreadCrumbNav link="/add-patient" />

        <HStack
          w="100%"
          justifyContent="space-between"
          bgColor="white"
          p={3}
          rounded="lg"
          mt={2}
        >
          <Text fontSize="xl" fontWeight="bold">
            Internal Lab Requests
            <span style={{
              fontSize: '18px',
              // fontWeight: 'normal',
              color: 'gray',
            }}
            >
              {' '}
              (
              {subRowData?.length}
              )

            </span>
          </Text>
          <HStack>
            <Button leftIcon={<FaPrint />}>Print Report</Button>

            <Button leftIcon={<FaFileDownload />}>Download</Button>

          </HStack>
        </HStack>
        {subRowData?.length === 0 ? (
          <VStack p={5}>

            <FaBoxOpen size="120" color="gray" />
            <Text fontSize="xl" fontWeight="semibold" color="gray.500">No Patients Today</Text>

          </VStack>
        )
          : (
            <Box
              w="100%"
              bgColor="white"
              p={3}
              h="89%"
            >
              <DataTable2 data={subRowData} columns={columns} />
            </Box>
          )}
      </Box>
    </VStack>
  );
};

export default InternalLabRequest;

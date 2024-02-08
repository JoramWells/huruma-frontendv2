/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import {
  Box, Button, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Tag, Text, VStack,
} from '@chakra-ui/react';
// import axios from "axios"
import {
  FaEllipsisV, FaFileDownload, FaPrint,
} from 'react-icons/fa';
import { useMemo } from 'react';
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';
import BreadCrumbNav from '../../components/BreadCrumbNav';
import DataTable2 from '../../components/tables/DataTable';
import { useGetAppointmentsQuery } from '../../api/appointments.api';
import UserNameAvatar from '../../components/UserNameAvatar';

const Appointments = () => {
  const { data } = useGetAppointmentsQuery();
  console.log(data);

  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      // {
      //   header: 'Appointment ID',
      //   accessorKey: 'appointment_id',
      //   cell: (props) => (
      //     <Box
      //       padding={2}
      //       _hover={{
      //         cursor: 'pointer',
      //         bgColor: 'gray.50',
      //       }}
      //       onClick={() => navigate(`/appointment-detail/${props.getValue()}`)}
      //     >
      //       <Text>{props.getValue()}</Text>
      //     </Box>
      //   ),

      // },
      {
        header: 'Full Name',
        accessorKey: 'patient',
        cell: (props) => (
          <Box
            _hover={{
              cursor: 'pointer',
            }}
            onClick={() => navigate(`/appointment-detail/${props.row.original.appointment_id}`)}

          >
            <UserNameAvatar
              fullName={`${props.getValue()?.first_name} ${props.getValue()?.middle_name}`}
            />
          </Box>
        ),

      },
      {
        header: 'Doctor ID',
        accessorKey: 'doctor_id',
        cell: (props) => <Text>{props.getValue()}</Text>,
        size: 200,

      },

      {
        header: 'Appointment Date',
        accessorKey: 'appointment_date',
        enableSorting: false,
        cell: (props) => (
          <VStack alignItems="flex-start">
            <Text>{moment(props.getValue()).format('LL')}</Text>
            <Text color="gray.500">{moment(props.row.original.appointment_time, 'HH:mm:ss.SSS').format('h:mm A')}</Text>
          </VStack>
        ),

      },
      {
        header: 'Appointment Status',
        accessorKey: 'appointment_status',
        cell: (props) => (
          <Box>
            {props.getValue() === 'Seen' ? (
              <Tag
                colorScheme="green"
                rounded="full"
              >
                Seen
              </Tag>
            )
              : (
                <Tag
                  colorScheme="red"
                  rounded="full"
                >
                  Waiting
                </Tag>
              )}
          </Box>
        ),

      },
      {
        header: 'Charges',
        accessorKey: 'charges',
        cell: (props) => <Text>{props.getValue()}</Text>,
        size: 200,

      },
      {
        header: 'Vital SIgns',
        accessorKey: 'doctorid',
        cell: () => <Text>NOT RECORDED</Text>,
        size: 200,

      },

      {
        header: 'Action',
        accessorKey: 'doctor_d',
        cell: () => (
          <Menu>
            <MenuButton
              as={IconButton}
              pr={3}
              rightIcon={<FaEllipsisV />}
              bgColor="transparent"
              color="gray"

            />
            <MenuList>
              <MenuItem>Download</MenuItem>
              <MenuItem>Create a Copy</MenuItem>
              <MenuItem>Mark as Draft</MenuItem>
              <MenuItem>Delete</MenuItem>
              <MenuItem>Attend a Workshop</MenuItem>
            </MenuList>
          </Menu>
        ),
        size: 200,

      },
    ],

    [navigate],
  );

  const subRowData = data
    && data.map((item) => ({
      ...item,
      subRows: [],
    }));

  const filteredData = subRowData?.filter((item) => {
    const itemDate = moment(item.appointment_date);
    const todayDate = moment(new Date()).format('YYYY-MM-DD');
    return data;
  });

  console.log(data, 'gthy');

  return (
    <VStack
      mt="65px"
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
            Appointments
            <span style={{
              fontSize: '18px',
              // fontWeight: 'normal',
              color: 'gray',
            }}
            >
              {' '}
              (
              {filteredData?.length}
              )

            </span>
          </Text>
          <HStack>
            <Button leftIcon={<FaPrint />}>Print Report</Button>

            <Button leftIcon={<FaFileDownload />}>Download</Button>

          </HStack>
        </HStack>
        <Box
          w="100%"
          bgColor="white"
          p={3}
          h="89%"
        >
          <DataTable2 data={filteredData} columns={columns} />
        </Box>
      </Box>
    </VStack>
  );
};

export default Appointments;

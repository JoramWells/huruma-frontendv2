/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */

import {
  Box, Button, HStack, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, VStack,
} from '@chakra-ui/react';
import moment from 'moment/moment';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronCircleDown, FaEllipsisH } from 'react-icons/fa';
import DataTable2 from '../../components/tables/DataTable';

const PatientDetailAppointment = ({ data }) => {
  const navigate = useNavigate();
  const columns = useMemo(
    () => [
      {
        header: 'Appointment Time',
        accessorKey: 'appointment_date',
        cell: (props) => (
          <VStack alignItems="flex-start">
            <Text>{moment(props.getValue()).format('LL')}</Text>
            <Text color="gray.500">{moment(props.row.original.appointment_time, 'HH:mm').format('hh:mm A')}</Text>
          </VStack>
        ),

      },
      {
        header: 'PAYMENT DETAILS',
        accessorKey: 'insurance_detail',
        enableSorting: false,
        cell: (props) => <Text>{props.getValue()?.insurance_name}</Text>,

      },
      {
        header: 'Consultation Type',
        enableSorting: false,
        cell: (props) => (
          <Text>
            OPD
          </Text>
        ),

      },
    ],

    [],
  );
  return (
    <VStack>
      <HStack
        w="2xl"
        justifyContent="space-between"
        bgColor="white"
        p={2}
      >
        <Text
          fontSize="14px"
          color="gray.700"
          fontWeight="bold"
        >
          All
        </Text>

        <Menu>
          <MenuButton
            px={4}
            py={2}
            transition="all 0.2s"
            borderRadius="md"
            // borderWidth="1px"
            // _hover={{ bg: 'gray.400' }}
            // _expanded={{ bg: 'blue.400' }}
            // _focus={{ boxShadow: 'outline' }}
          >
            <FaEllipsisH />
          </MenuButton>
          <MenuList>
            <MenuItem>All</MenuItem>
            <MenuItem>Today</MenuItem>
            <MenuDivider />
            <MenuItem color="green.400">Paid</MenuItem>
            <MenuItem color="red.400">Unpaid</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
      <VStack
        w="2xl"
      >
        <DataTable2
          columns={columns}
          data={data}
          hasSearch={false}
          isTableHeight={false}
        />
      </VStack>
    </VStack>
  );
};

export default PatientDetailAppointment;

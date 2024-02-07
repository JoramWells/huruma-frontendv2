/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Avatar,
  Box, Button, HStack, IconButton, Text, VStack, useDisclosure,
} from '@chakra-ui/react';
import moment from 'moment/moment';
import { FaArrowRight, FaEdit } from 'react-icons/fa';
import IndeterminateCheckbox from '../../_Doctor/components/IndeterminateCheckbox';
import BreadCrumbNav from '../../components/BreadCrumbNav';
import TablePharmacyRequest from '../../_Pharmacy/components/TablePharmacyRequest';
import { useGetInternalLabRequestQuery } from '../../api/internalLabRequests.api';
import { useGetUserPersonalAccountDetailQuery } from '../../api/personalAccountCharges.api';
import TablePersonalAccountCharge from '../components/TablePersonalAccountCharge';

const PersonalAccountChargeDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetUserPersonalAccountDetailQuery(id);
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log(data);

  const columns = useMemo(() => [
    {
      id: 'select',
      header: ({ table }) => (
        <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }) => (
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      ),
    },
    {
      header: 'Service',
      accessorKey: 'service_desc',
      cell: (props) => (
        <Text>
          {props.getValue()}
        </Text>
      ),
    },
    {
      header: 'PAY STATUS',
      accessorKey: 'pay_status',
      cell: (props) => <Text>{props.getValue()}</Text>,
    },
    {
      header: 'Quantity',
      accessorKey: 'quantity',
      cell: (props) => <Text>{props.getValue() === 0 ? 1 : props.getValue()}</Text>,
    },
    {
      header: 'Cost',
      accessorKey: 'amount',
      cell: (props) => <Text>{props.getValue()}</Text>,
    },
    {
      header: 'Cost',
      cell: (props) => (
        <IconButton
          onClick={onOpen}
        >
          <FaEdit />
        </IconButton>
      ),
    },
    {
      header: 'Total',
      //   accessorKey: 'cost',
      cell: (props) => (
        <Text>
          {props.row.original.quantity * (props.row.original.amount === 0
            ? 1 : props.row.original.amount)}
        </Text>
      ),
    },

  ], []);
  return (
    <VStack
      w="full"
      h="100vh"
      bgColor="gray.50"
      mt="65px"
      alignItems="center"
      p={3}
    >
      <BreadCrumbNav />
      <HStack
        bgColor="white"
        w="full"
        rounded="lg"
        p={3}
        border="1px"
        borderColor="gray.200"
      >
        {data
          && (
            <>
              <Avatar
                name={`${data[0]?.patient?.first_name} ${data[0]?.patient?.middle_name}`}
                size="lg"
                color="white"
                fontWeight="bold"
              />
              <VStack alignItems="flex-start">
                <Text
                  fontSize="xl"
                  fontWeight="bold"
                  color="gray.700"
                >
                  {data[0]?.patient.first_name}
                  {' '}
                  {data[0]?.patient.middle_name}
                </Text>

                <Text fontSize="lg" color="gray.500">
                  {moment().diff(data[0]?.patient?.dob, 'years')}
                  {' '}
                  years
                </Text>
              </VStack>
            </>
          )}

      </HStack>
      <HStack
        spacing={4}
        justifyContent="center"
      >
        <TablePersonalAccountCharge
          column={columns}
          data={data}
          onOpen={onOpen}
          onClose={onClose}
          isOpen={isOpen}

        />

      </HStack>
    </VStack>
  );
};

export default PersonalAccountChargeDetail;

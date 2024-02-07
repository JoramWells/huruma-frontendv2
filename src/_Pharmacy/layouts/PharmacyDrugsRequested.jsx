/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Avatar,
  Box, Button, HStack, Text, VStack,
} from '@chakra-ui/react';
import moment from 'moment/moment';
import { useGetInternalPharmacyRequestQuery } from '../api/internalPharmacyRequest.api';
import TablePharmacyRequest from '../components/TablePharmacyRequest';
import IndeterminateCheckbox from '../../_Doctor/components/IndeterminateCheckbox';
import BreadCrumbNav from '../../components/BreadCrumbNav';

const PharmacyDrugsRequested = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetInternalPharmacyRequestQuery(id);
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
      header: 'Payment details',
      cell: (props) => <Text />,
    },
    {
      header: 'Requested By',
      cell: (props) => <Text />,
    },
    {
      header: 'Medication',
      accessorKey: 'medication',
      cell: (props) => (
        <Text>
          {props.getValue()?.medication_name.substring(1, 20)}
          ..
        </Text>
      ),
    },
    {
      header: 'Instructions',
      accessorKey: 'prescription_term',
      cell: (props) => <Text>{props.getValue()}</Text>,
    },
    {
      header: 'COMMENTS',
      accessorKey: 'comments',
      cell: (props) => <Text>{props.getValue()}</Text>,
    },
    {
      header: 'No. of Days',
      accessorKey: 'number_of_days',
      cell: (props) => <Text>{props.getValue()}</Text>,
    },
    {
      header: 'PAY STATUS',
      accessorKey: 'pay_status',
      cell: (props) => <Text>{props.getValue()}</Text>,
    },
    {
      header: 'Quantity',
      accessorKey: 'quantity',
      cell: (props) => <Text>{props.getValue()}</Text>,
    },
    {
      header: 'Selling Price',
      accessorKey: 'cost',
      cell: (props) => <Text>{props.getValue()}</Text>,
    },
    {
      header: 'Total',
      //   accessorKey: 'cost',
      cell: (props) => <Text>{props.row.original.quantity * props.row.original.cost}</Text>,
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
      <TablePharmacyRequest column={columns} data={data} />
    </VStack>
  );
};

export default PharmacyDrugsRequested;

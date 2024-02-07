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
import IndeterminateCheckbox from '../../_Doctor/components/IndeterminateCheckbox';
import BreadCrumbNav from '../../components/BreadCrumbNav';
import TablePharmacyRequest from '../../_Pharmacy/components/TablePharmacyRequest';
import { useGetInternalLabRequestQuery } from '../../api/internalLabRequests.api';

const InternalLabRequestsDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetInternalLabRequestQuery(id);
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
      header: 'Procedure',
      accessorKey: 'procedure_detail',
      cell: (props) => (
        <Text>
          {props.getValue()?.procedure_name}
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
      cell: (props) => <Text>{props.getValue()}</Text>,
    },
    {
      header: 'Cost',
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

export default InternalLabRequestsDetail;

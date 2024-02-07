/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import {
  Box, Button, HStack, Text, VStack, Tag, Menu, MenuButton, MenuList, MenuItem, IconButton, Avatar,
} from '@chakra-ui/react';
// import axios from "axios"
import { FaEllipsisH, FaFileDownload, FaPrint } from 'react-icons/fa';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment/moment';
import BreadCrumbNav from '../../components/BreadCrumbNav';
import DataTable2 from '../../components/tables/DataTable';
import { useGetAllAdmissionsQuery } from '../../api/admissions.api';
import UserNameAvatar from '../../components/UserNameAvatar';

const Admission = () => {
  const navigate = useNavigate();

  const {
    data, isLoading,
  } = useGetAllAdmissionsQuery();

  console.log(data);

  const columns = useMemo(
    () => [
      {
        header: 'Patient Name',
        accessorKey: 'patient',
        cell: (props) => (
          <HStack>
            <Avatar
              rounded="xl"
              fontWeight="bold"
              color="gray.700"
              size="sm"
              name={props.getValue() ? `${props.getValue()?.first_name
              } ${props.getValue()?.middle_name}` : '0'}
            />
            <Text
              textTransform="uppercase"
            >
              {props.getValue() ? `${props.getValue()?.first_name
              } ${props.getValue()?.middle_name}` : '0'}
            </Text>
          </HStack>
        ),

      },
      {
        header: 'Admission Date',
        accessorKey: 'admission_date',
        enableSorting: false,
        cell: (props) => <Text>{moment(new Date(props.getValue())).format('LL')}</Text>,

      },
      {
        header: 'Payment Details',
        accessorKey: 'pay_status',
        enableSorting: false,
        cell: (props) => (
          <Box>
            {props.getValue() === 1 ? (
              <Tag
                colorScheme="green"
                variant="subtle"
                rounded="xl"
                border="1px"
              >
                PAID
              </Tag>
            ) : (
              <Tag
                rounded="md"
                colorScheme="red"
                variant="subtle"
              >
                NOT PAID
              </Tag>
            )}
          </Box>
        ),

      },
      {
        header: 'Bed Number',
        accessorKey: 'ward_bed',
        enableSorting: false,
        cell: (props) => (
          <VStack
            bgColor="blue.500"
            color="white"
            rounded="xl"
            fontWeight="extrabold"
            h={10}
            w={10}
            justifyContent="center"
          >
            <Text>{props.getValue()?.bed_number}</Text>
          </VStack>
        ),

      },
      {
        header: 'Action',
        cell: (props) => (
          <Menu size="lg">
            <MenuButton
              colorScheme="gray"
              variant="ghost"
              color="gray"
              pr={3}
              as={IconButton}
              rightIcon={<FaEllipsisH />}
            />
            <MenuList
              boxShadow="lg"
            >
              <MenuItem
                onClick={() => navigate(`/admission-profile/${props.row.original.admission_id}`)}
              >
                Admission Profile

              </MenuItem>
              <MenuItem>Interim Inpatient Bill</MenuItem>
              <MenuItem>Discharge Patient</MenuItem>
              <MenuItem>Transfer/Admit</MenuItem>
            </MenuList>
          </Menu>
        ),
      },
    ],

    [],
  );

  const subRowData = data
    && data.map((item) => ({
      ...item,
      subRows: [],
    }));

  // if (isLoading) return <div>loading..</div>;

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
        <BreadCrumbNav link="/add-admission" />

        <HStack>
          <Box>
            <Text>
              Paid
            </Text>
            <Text>34</Text>
          </Box>
        </HStack>

        <HStack
          w="100%"
          justifyContent="space-between"
          bgColor="white"
          p={3}
          rounded="lg"
          mt={2}
        >
          <Text fontSize="xl" fontWeight="bold">
            Admissions
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
        <Box
          w="100%"
          bgColor="white"
          p={3}
          h="89%"
        >
          <DataTable2
            searchQueryColumn="pay_status"
            data={subRowData}
            columns={columns}
          />
        </Box>
      </Box>
    </VStack>
  );
};

export default Admission;

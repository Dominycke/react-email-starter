import { Body, Button, Container, Column, Head, Heading, Hr, Html, Img, Link, Preview, Row, Section, Text, } from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";
import dayjs from 'dayjs'
import iataCode from "../iataCode.json"
import airlineCode from "../airlaneCode.json"
import currency from "currency.js";

interface VercelInviteUserEmailProps {
  // username?: string;
  // bookingId?: string,
  // airlineCode?: string,
  // arrivalDate?: string,
  // arrivalTime?: string,
  // departureDate?: string,
  // departureTime?: string,
  // fromAirportCode?: string,

  userFirstName: string;
  bookingId: string;
  email: string;
  fares: any[];
  journeys: any[];
  travelers: any[];
  flights: any[]
}


const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";



export const VercelInviteUserEmail = ({
  // bookingId,
  // fromAirportCode,
  // departureDate,
  // departureTime,
  // arrivalDate,
  // arrivalTime

  userFirstName,
  bookingId,
  email,
  fares,
  journeys,
  travelers,
  flights
}: VercelInviteUserEmailProps) => {
  // const previewText = `Join ${invitedByUsername} on Vercel`;

  // const cityFirstAC = iataCode.find(iata => (iata.CODE === journeys[0].firstAirportCode))?.CIUDAD || 'CD Desconocida'
  // const cityLastAC = iataCode.find(iata => (iata.CODE === journeys[0].lastAirportCode))?.CIUDAD || 'CD Desconocida'

  const getAirlineName = (code: string) => {
    const airline = airlineCode.find(airline => airline.CODIGO === code)
    return airline ? airline['COMPAÑÍA AEREA'] : '';
  }

  const getIataName = (iata: string) => {
    const iataName = iataCode.find(iataName => iataName.CODE === iata)
    return iataName ? iataName['CIUDAD'] : ''
  }


  let durationTotal = 0

  flights.forEach(f => {
    if (f.fromAirportCode === journeys[0].firstAirportCode) {
      durationTotal += f.durationInMinutes
      flights.forEach(t => {
        if (t.toAirportCode === journeys[0].lastAirportCode) {
          durationTotal += t.durationInMinutes
        }
      })
    }
  })

  return (
    <Html>
      <Head />
      <Preview>Autorizar reserva</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded-lg my-[40px] mx-auto p-[20px] max-w-screen-md">

            <Section className="text-black text-[14px] font-normal text-right">
              <Row>
                <Column>
                  <Img src={`${baseUrl}/static/logo.png`} width="60" height="60" alt="Vercel" />
                </Column>
                <Column>
                  <Text className="m-0 font-bold">Número de reserva</Text>
                  <Text className="m-0 font-bold">Booking ID - {bookingId}</Text>
                </Column>
              </Row>
            </Section>

            <Text className="text-black text-[24px] font-bold text-center p-0 my-[30px] mx-0">
              !Su reserva esta casi lista!
            </Text>

            <Section className="mx-auto max-w-screen-sm">
              <Text className="text-black text-[16px] text-justify p-0 my-[10px] mx-0">
                Gracias por haber seleccionado los servicios de <strong>Gales BTS</strong> para organizar su próximo viaje.
              </Text>
              <Text className="text-black text-[16px] text-justify p-0 my-[10px] mx-0">
                Para garantizar que todo esté de acuerdo a sus preferencias, le invitamos a confirmar su solicitud haciendo clic en '<strong>Aceptar</strong>'.
              </Text>
              <Text className="text-black text-[16px] text-justify p-0 my-[10px] mx-0">
                En caso contrario, si sus planes de viaje han cambiado, le solicitamos cancelar esta solicitud. Si necesita asistencia adicional, por favor no dude en ponerse en contacto con su agente de ventas.
              </Text>
            </Section>

            <Section className="border border-solid border-gray-200 shadow-lg rounded-lg my-[20px] mx-auto p-[20px] max-w-screen-sm">
              {/* ROUTE */}
              <Row>
                <Column className="w-1/3">
                  <Text className="m-0 text-3xl font-bold">{journeys[0].firstAirportCode}</Text>
                  <Text className="m-0 text-[16px] text-gray-400">{getIataName(journeys[0].firstAirportCode)}</Text>
                </Column>

                <Column className="w-1/3 text-center">
                  <strong className="w-full flex justify-center pb-2"><Img src={`${baseUrl}/static/p2.png`} width="full" height="20" alt="Vercel" /></strong>
                  <strong className="text-[12px] rounded bg-gray-200 font-normal p-2">{journeys ? (journeys.length === 1 ? 'Sencillo' : journeys.length === 2 ? 'Redondo' : 'Múltiples destinos') : undefined}</strong>
                </Column>

                <Column className="w-1/3 text-right">
                  <Row><Text className="m-0 text-3xl font-bold">{journeys[0].lastAirportCode}</Text></Row>
                  <Row><Text className="m-0 text-[16px] text-gray-400">{getIataName(journeys[0].lastAirportCode)}</Text></Row>
                </Column>
              </Row>

              <Hr className="border border-solid border-gray-200 my-[26px] mx-0 w-full" />

              {/* TRAVELERS */}
              <Text className="m-0 text-lg font-bold">TRAVELER (S)</Text>
              {travelers.map(({ givenName, surname, type }, index) =>
              (
                <Section>
                  <Row>
                    <Column className="flex flex-row">
                      <Text key={`${index}.${surname}`} className="font-bold text-[12px] p-0 my-[2px] mx-0 mr-3">{surname} / {givenName}</Text>
                      <Text className="text-gray-400 text-[12px] p-0 my-[2px] mx-0">({type})</Text>
                    </Column>
                  </Row>
                </Section>
              ))}

              <Hr className="border border-solid border-gray-200 my-[10px] mx-0 w-full" />

              {/* FARE */}
              <Section>
                <Row>
                  <Column className="w-full flex justify-between">
                    <Text className="m-0 text-lg font-bold">TOTAL</Text>
                    <Text className="m-0 text-[20px] text-gray-400 text-right">{[currency(fares[0].totals.total).format(), fares[0].totals.currencyCode].join(' ')}</Text>
                  </Column>
                </Row>
              </Section>
            </Section>

            <Section className="text-center mt-[32px] mb-[32px]">
              <Link href={`http://localhost:3001/itinerary/${bookingId}`} className="underline">
                ( Ver Itinerario )
              </Link>
            </Section>

            <Section className="text-center mt-[32px] mb-[32px]">
              <Link href="#" className="bg-green-800 rounded text-white text-[14px] font-semibold no-underline text-center px-5 py-3 mr-10">
                Aceptar
              </Link>

              <Link href="#" className="bg-red-800 rounded text-white text-[14px] font-semibold no-underline text-center px-5 py-3">
                Cancelar
              </Link>
            </Section>

            <Section className="max-w-screen-sm ">
              <strong className="text-[24px]">PLAN DE VUELO</strong>
            </Section>

            {flights.map((({ departureDate, departureTime, fromAirportCode, arrivalDate, arrivalTime, toAirportCode, durationInMinutes, airlineCode, cabinTypeCode, operatingAirlineCode, flightNumber }, index) => {
              const departure = dayjs(`${departureDate}T${departureTime}`)
              const arrival = dayjs(`${arrivalDate}T${arrivalTime}`)

              return (
                <Section key={`${index}.${fromAirportCode}`} className="border border-solid border-gray-200 shadow-lg rounded-lg my-[20px] mx-auto p-[20px] max-w-screen-sm ">

                  <Section>
                    <Row>
                      <Column className="w-1/2">
                        <Text className="m-0 text-[14px] font-bold">{getAirlineName(airlineCode)}</Text>
                        <Text className="m-0 text-[12px]">{operatingAirlineCode} {flightNumber}</Text>
                      </Column>
                      <Column className="w-1/2">
                        <Text className="m-0 text-[14px] font-bold">{CabinType[cabinTypeCode as CabinCode]}</Text>
                      </Column>
                    </Row>
                  </Section>

                  <Hr className="border border-solid border-gray-200 my-[10px] mx-0 w-full" />


                  <Section>
                    <Row>
                      <Column className="text-center w-1/3" >
                        <Text className="m-0 text-[14px] text-gray-400">{departure.format('DD MMM YYYY')}</Text>
                        <Text className="m-0 text-[20px] font-bold">{departure.format('H:mm')}</Text>
                        <Text className="m-0 font-bold">{fromAirportCode} </Text>
                        <Text className="m-0 text-[14px] text-gray-400">({getIataName(fromAirportCode)})</Text>
                      </Column>
                      <Column className="text-center w-1/3" >
                        <strong className="w-full flex justify-center pb-2"><Img src={`${baseUrl}/static/p2.png`} width="full" height="20" alt="Vercel" /></strong>
                        <strong className="text-[12px] rounded bg-gray-200 font-normal p-2">{getDurationFlight(durationInMinutes)}</strong>
                      </Column>
                      <Column className="text-center w-1/3" >
                        <Text className="m-0 text-[14px] text-gray-400">{arrival.format('DD MMM YYYY')}</Text>
                        <Text className="m-0 text-[20px] font-bold">{arrival.format('H:mm')}</Text>
                        <Text className="m-0 font-bold">{toAirportCode} </Text>
                        <Text className="m-0 font-normal text-[14px] text-gray-400">({getIataName(toAirportCode)})</Text>
                      </Column>
                    </Row>
                  </Section>
                </Section>
              )
            }))}

            <Section className="text-center mt-[32px] mb-[32px]">
              <Link href="#" className="bg-green-800 rounded text-white text-[14px] font-semibold no-underline text-center px-5 py-3 mr-10">
                Aceptar
              </Link>

              <Button href="#" className="bg-red-800 rounded text-white text-[14px] font-semibold no-underline text-center px-5 py-3">
                Cancelar
              </Button>
            </Section>

            <Section className="max-w-screen-md">
              <Hr className="border border-solid border-gray-200 my-[26px] mx-0 w-full" />
              <Text className="text-gray-600 text-[12px] leading-[24px] text-center">
                © 2024 | Av. Leonardo Zuloaga 424, Lós Ángeles C.P. 27140 Torreón, Coah.
              </Text>
            </Section>

          </Container>
        </Body>
      </Tailwind>
    </Html >
  );
};

// VercelInviteUserEmail.PreviewProps = {
//   username: "alanturing",
//   bookingId: "NNQTOW",
//   airlineCode: "AM",
//   arrivalDate: "2024-07-25",
//   arrivalTime: "18:35:00",
//   departureDate: "2024-07-24",
//   departureTime: "23:45:00",
//   fromAirportCode: "MEX",
//   toAirportCode: "AMS",
// } as VercelInviteUserEmailProps;

export const getDurationFlight = (durationInMinutes: any) => {
  if (!durationInMinutes) return ''
  const horas = Math.floor(parseInt(durationInMinutes, 10) / 60)
  const minutos = durationInMinutes % 60
  return `${horas}h ${minutos.toString().padStart(2, '0')}m`
}

const CabinType = {
  Y: 'TURISTA',
  B: 'BUSINESS',
  C: 'BUSINESS',
  F: 'PRIMERA CLASE',
  W: 'TURISTA PREMIUM'
}
type CabinCode = keyof (typeof CabinType)

VercelInviteUserEmail.PreviewProps = {
  "id": "clv1b9vi407g521fbh2f33fw1",
  "bookingId": "JKUZKJ",
  "startDate": "2024-04-26",
  "endDate": "2024-04-29",
  "isTicketed": false,
  "creationDetails": {
    "agent": {
      "num": "A41",
      "name": "Beatriz Medina",
      "email": "bmedina@gales.com.mx",
      "queue": "110"
    }
  },
  "contactInfo": {
    "emails": [
      "BMEDINA@GALES.COM.MX"
    ],
    "phones": [
      "871 7222911-A",
      "871-285-0920-B",
      "871-755-95-98-H"
    ]
  },
  "travelers": [
    {
      "givenName": "LUZMARIA MISS",
      "surname": "TRICIOCANTU",
      "type": "ADULT"
    }
  ],
  "flights": [
    {
      "confirmationId": "AYIWQZ",
      "aircraftTypeName": "EMBRAER EMB E90",
      "operatingAirlineCode": "AM",
      "cabinTypeCode": "Y",
      "seats": [
        {
          "number": "21B"
        }
      ],
      "fromAirportCode": "TRC",
      "toAirportCode": "MEX",
      "airlineCode": "AM",
      "flightNumber": 103,
      "departureDate": "2024-04-26",
      "departureTime": "09:49:00",
      "arrivalDate": "2024-04-26",
      "arrivalTime": "11:35:00",
      "durationInMinutes": 106,
      "flightStatusCode": "HK",
      "flightStatusName": "Confirmed"
    },
    {
      "confirmationId": "AYIWQZ",
      "aircraftTypeName": "EMBRAER EMB E90",
      "operatingAirlineCode": "AM",
      "cabinTypeCode": "Y",
      "seats": [
        {
          "number": "23C"
        }
      ],
      "fromAirportCode": "MEX",
      "toAirportCode": "SLP",
      "airlineCode": "AM",
      "flightNumber": 2534,
      "departureDate": "2024-04-26",
      "departureTime": "14:45:00",
      "arrivalDate": "2024-04-26",
      "arrivalTime": "16:12:00",
      "durationInMinutes": 87,
      "flightStatusCode": "HK",
      "flightStatusName": "Confirmed"
    },
    {
      "confirmationId": "AYIWQZ",
      "aircraftTypeName": "EMBRAER EMB E90",
      "operatingAirlineCode": "AM",
      "cabinTypeCode": "Y",
      "seats": [
        {
          "number": "14B"
        }
      ],
      "fromAirportCode": "SLP",
      "toAirportCode": "MEX",
      "airlineCode": "AM",
      "flightNumber": 2541,
      "departureDate": "2024-04-29",
      "departureTime": "13:48:00",
      "arrivalDate": "2024-04-29",
      "arrivalTime": "15:05:00",
      "durationInMinutes": 77,
      "flightStatusCode": "HK",
      "flightStatusName": "Confirmed"
    },
    {
      "confirmationId": "AYIWQZ",
      "aircraftTypeName": "EMBRAER EMB E90",
      "operatingAirlineCode": "AM",
      "cabinTypeCode": "Y",
      "seats": [
        {
          "number": "14C"
        }
      ],
      "fromAirportCode": "MEX",
      "toAirportCode": "TRC",
      "airlineCode": "AM",
      "flightNumber": 106,
      "departureDate": "2024-04-29",
      "departureTime": "17:25:00",
      "arrivalDate": "2024-04-29",
      "arrivalTime": "19:28:00",
      "durationInMinutes": 123,
      "flightStatusCode": "HK",
      "flightStatusName": "Confirmed"
    }
  ],
  "journeys": [
    {
      "departureDate": "2024-04-26",
      "departureTime": "09:49",
      "firstAirportCode": "TRC",
      "lastAirportCode": "SLP",
      "numberOfFlights": 2
    },
    {
      "departureDate": "2024-04-29",
      "departureTime": "13:48",
      "firstAirportCode": "SLP",
      "lastAirportCode": "TRC",
      "numberOfFlights": 2
    }
  ],
  "fares": [
    {
      "creationDetails": {
        "purchaseDeadlineDate": "2024-04-17",
        "purchaseDeadlineTime": "23:59"
      },
      "fareConstruction": [
        {
          "fareBasisCode": "BNNN0QFM"
        },
        {
          "fareBasisCode": "QNNBHQFM"
        }
      ],
      "totals": {
        "total": "11485",
        "currencyCode": "MXN"
      }
    }
  ],
  "payments": {},
  "createdAt": "2024-04-15T18:51:41.115Z",
  "updatedAt": "2024-04-16T00:16:20.937Z",
  "customer": {
    "dk": "006110",
    "name": "JOSE ANTONIO TRICIO HARO"
  }
}

export default VercelInviteUserEmail;


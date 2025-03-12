import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { Chart } from 'primereact/chart'
import 'primeflex/primeflex.css'
import { Button } from 'primereact/button'

const SectionHeader = ({ title, icon }) => (
  <div
    className='h-2rem mx-4 lg:mx-0 lg:w-20rem lg:justify-content-end text-white py-1 font-bold border-round-md'
    style={{
      background: 'linear-gradient(105.42deg, #3AA54B 33.61%, #107C55 80.31%)',
    }}>
    <div className='flex justify-content-between align-items-center px-2'>
      <b>{title}</b>
      <i className={icon}></i>
    </div>
  </div>
)

const CustomProgressBar = ({ progress }) => (
  <div
    className='lg: w-30rem '
    style={{
      width: '111.13px',
      height: '18px',
      backgroundColor: '#d3e8dc',
      borderRadius: '0px 20px 20px 0px',
      position: 'relative',
    }}>
    <div
      style={{
        width: `${progress * 100}%`,
        height: '100%',
        background: 'linear-gradient(105.42deg, #3AA54B 33.61%, #107C55 80.31%',
        borderRadius: '0px 20px 20px 0px',
      }}></div>
  </div>
)

const ProgressCircle = ({ value, text, label }) => (
  <Col className='d-flex flex-column align-items-center h-10rem'>
    <CircularProgressbar
      value={value}
      text={text}
      strokeWidth={8}
      styles={buildStyles({
        pathColor: '#3aa64c',
        textColor: '#3aa64c',
      })}
    />
    <div>{label}</div>
  </Col>
)

const InfoBox = ({ title, amount }) => (
  <div className='flex flex-column lg:w-30rem'>
    <div className='text-center lg:text-left'>{title}</div>
    <div
      className='h-3rem bg-green-600 w-full md:w-7rem lg:w-30rem py-3 text-white text-center font-bold border-round-md px-2'
      style={{
        background:
          'linear-gradient(105.42deg, #3AA54B 33.61%, #107C55 80.31%)',
      }}>
      {amount}
    </div>
  </div>
)

const FarmerTypeItem = ({ count, label }) => (
  <div className='flex align-items-center justify-content-between gap-2'>
    <p className='h-2rem w-2rem border-2 border-green-400 text-center border-circle py-1'>
      {count}
    </p>
    <span className='text-sm'>{label}</span>
  </div>
)

export default function AdminComponent(props) {
  const { handleOnFetchFarmersRecord, handleOnFetchCustomerRecord } =
    props.farmerProps
  const first = 7
  const second = 1240
  const secondValue = 30
  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement)
    setChartData({
      datasets: [
        {
          data: [700, 450],
          backgroundColor: [
            documentStyle.getPropertyValue('--green-500'),
            documentStyle.getPropertyValue('--green-200'),
          ],
        },
      ],
    })
    setChartOptions({
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
          },
        },
      },
    })
  }, [])

  return (
    <Container>
      <Row>
        <Col>
          <SectionHeader title='Farmer Statistics' icon='pi pi-filter-fill' />
          <div className='border border-round-md p-3 border-green-400'>
            <Row className='justify-content-between'>
              <ProgressCircle
                value={first}
                text={`${first}`}
                label='Total Markets'
              />
              <ProgressCircle
                value={secondValue}
                text={`${second}`}
                label='Stalls Booked'
              />
            </Row>
            <div
              style={{
                borderTop: '1px dotted #3aa64c',
                width: '100%',
                margin: '10px 0',
              }}></div>
            <div className='font-bold my-2 '>
              <b>Quantity</b>
              <hr className='w-6rem' />
            </div>
            <div className='d-flex justify-content-around  gap-3'>
              <div className='lg:w-30rem'>
                Purchase: <b>2,70,196 Kgs</b>
              </div>
              <div className='lg:w-30rem'>
                Sale: <b>2,60,639 Kgs</b>
              </div>
            </div>
            <div className='d-flex justify-content-between lg:justify-content-around gap-3 '>
              <CustomProgressBar progress={0.5} />
              <CustomProgressBar progress={0.9} />
            </div>
            <div className='font-bold py-2 mt-2'>
              <b>Amount</b>
              <hr className='w-6rem' />
            </div>
            <div className='d-flex gap-3 justify-content-between lg:justify-content-around '>
              <InfoBox title='Purchase' amount='2,24,62,908' />
              <InfoBox title='Sale' amount='3,17,26,226' />
            </div>
            <div
              style={{
                borderTop: '1px dotted #3aa64c',
                width: '100%',
                margin: '10px 0',
              }}></div>
            <div className='d-flex justify-content-center'>
              <Chart
                type='pie'
                data={chartData}
                options={chartOptions}
                className='h-10rem'
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <SectionHeader title='Farmer Types' />
          <div className='border border-round-md p-3 border-green-400'>
            <div className='flex gap-3 lg:gap-0 lg:ml-4 justify-content-around lg:justify-content-around px-3'>
              <FarmerTypeItem count='15' label='Farmers' />
              <div className='flex w-9rem lg:w-16rem lg:ml-5 mr-2 gap-3'>
                <FarmerTypeItem count='2' label='Organic/ Authentic products' />
              </div>
            </div>
            <div
              style={{
                borderTop: '1px dotted #3aa64c',
                width: '100%',
                margin: '10px 0',
              }}></div>
            <div className='flex gap-3 justify-content-around lg:justify-content-around px-3'>
              <FarmerTypeItem count='2' label='Startup' />
              <div className='flex ml-2 w-9rem mr-2 gap-2'>
                <FarmerTypeItem count='2' label='FPO/FPC' />
              </div>
            </div>
            <div
              style={{
                borderTop: '1px dotted #3aa64c',
                width: '100%',
                margin: '10px 0',
              }}></div>
            <div className='flex gap-3 justify-content-around lg:justify-content-around px-3'>
              <FarmerTypeItem count='0' label='Retailer' />
              <div className='flex ml-2 w-9rem mr-2 gap-2'>
                <FarmerTypeItem count='0' label='Wholesaler' />
              </div>
            </div>
            <div
              style={{
                borderTop: '1px dotted #3aa64c',
                width: '100%',
                margin: '10px 0',
              }}></div>
            <div className='flex gap-3 justify-content-around lg:justify-content-around px-3'>
              <FarmerTypeItem count='0' label='MSME' />
              <div className='flex ml-2 w-9rem mr-2 gap-2'>
                <FarmerTypeItem count='0' label='WSHG/NGO' />
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <SectionHeader title='Subscriptions' />
          <div className='border flex gap-3 border-round-md p-3 border-green-400 align-items-center justify-content-center'>
            <div className='flex justify-content-center align-items-center'>
              <div
                className='w-5rem h-5rem border-circle text-white flex align-items-center justify-content-center text-sm'
                style={{
                  background:
                    'linear-gradient(105.42deg, #3AA54B 33.61%, #107C55 80.31%)',
                }}>
                12600
              </div>
            </div>
            <div className='flex justify-content-center align-items-center mt-2'>
              Subscribers
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <SectionHeader title='Consumers' />
          <div className='border flex gap-3 border-round-md p-3 border-green-400 align-items-center justify-content-center'>
            <div className='flex justify-content-center align-items-center'>
              <div
                className='w-5rem h-5rem bg-green-600 border-circle text-white flex align-items-center justify-content-center text-sm'
                style={{
                  background:
                    'linear-gradient(105.42deg, #3AA54B 33.61%, #107C55 80.31%)',
                }}>
                12600
              </div>
            </div>
            <div className='flex justify-content-center align-items-center mt-2'>
              Consumers
            </div>
          </div>
        </Col>
      </Row>
      <div className='p-fluid'>
        <div className='p-grid p-justify-center p-align-center p-3'>
          <div className='flex gap-3'>
            <Button
              label='Farmer list'
              className='border-round-md'
              onClick={handleOnFetchFarmersRecord}
              style={{
                background:
                  'linear-gradient(105.42deg, #3AA54B 33.61%, #107C55 80.31%)',
              }}
            />
            <Button
              label='Consumer list'
              className='border-round-md'
              onClick={handleOnFetchCustomerRecord}
              style={{
                background:
                  'linear-gradient(105.42deg, #3AA54B 33.61%, #107C55 80.31%)',
              }}
            />
          </div>
        </div>
      </div>
      <div className='p-fluid'>
        <div className='p-grid p-justify-center p-align-center p-3'>
          <div className='p-col'>
            <Button
              label='Cancelled stall list'
              className='border-round-md'
              onClick={handleOnFetchCustomerRecord}
              style={{
                background:
                  'linear-gradient(105.42deg, #3AA54B 33.61%, #107C55 80.31%)',
              }}
            />
          </div>
        </div>
      </div>
    </Container>
  )
}

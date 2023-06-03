import React from 'react'
import { Doughnut } from 'react-chartjs-2'

import {
  Typography,
  IconButton,
  Tooltip,
  CircularProgress,
} from '@material-ui/core'
import { Chart as ChartJS, ArcElement, Tooltip as Tool, Legend } from 'chart.js'

import { makeStyles } from '@material-ui/core/styles'
import Image from 'next/image'

const useStyles = makeStyles((theme) => ({
  activityBox2: {},
  chartLineWallet: {
    boxShadow: '0px 0px 0px white',
  },
}))

ChartJS.register(ArcElement, Tool, Legend)
const BalanceGraph = (props) => {
  const classes = useStyles()
  var graphRef = React.useRef(null)

  const options = {
    elements: {
      arc: {
        roundedCornersFor: 0,
        roundedCornersFor2: 2,
      },
    },
    cutout: '90%',

    tooltips: {
      // enabled: false,
      callbacks: {
        label: (tooltipItem, data) => {
          // Get the dataset label, global label or fall back to empty label
          let label =
            (data.datasets[tooltipItem.datasetIndex].labels &&
              data.datasets[tooltipItem.datasetIndex].labels[
              tooltipItem.index
              ]) ||
            data.labels[tooltipItem.index] ||
            ''
          if (label) {
            label += ': '
          }

          // Apply the value and suffix
          label +=
            data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] +
            (data.datasets[tooltipItem.datasetIndex].labelSuffix || '')

          return label
        },
      },
    },
  }

  //transaction.balance_change < 0 ? 'Credit' : 'Debit'
  var debits = props.activities.length
    ? (props.activities.filter((a) => a.balance_change < 0).length /
      props.activities.length) *
    100
    : 50
  var credits = props.activities.length
    ? (props.activities.filter((a) => a.balance_change > 0).length /
      props.activities.length) *
    100
    : 50
  var graphGap = 2
  const data = {
    datasets: [
      {
        data: [debits, graphGap, credits, graphGap],
        backgroundColor: [
          'rgba(231, 0, 96, 1)',
          'white',
          'rgba(51, 136, 255, 1)',
          'white',
        ],
        // These labels and labelSuffix use the custom tooltips callbacks
        // They will also not trigger the legend
        labels: ['Credit', '', 'Deposit'],
        labelSuffix: '$',
        pointStyle: 'circle',
        borderRadius: 30,
      },
    ],
  }

  const chatInnerPlugin = {
    afterUpdate: function (chart) {
      if (chart.config.options.elements.arc.roundedCornersFor !== undefined) {
        var arc =
          chart.getDatasetMeta(0).data[
          chart.config.options.elements.arc.roundedCornersFor
          ]
        var arc2 =
          chart.getDatasetMeta(0).data[
          chart.config.options.elements.arc.roundedCornersFor2
          ]

        arc.round = {
          x: (chart.chartArea.left + chart.chartArea.right) / 2,
          y: (chart.chartArea.top + chart.chartArea.bottom) / 2,
          radius: (chart.outerRadius + chart.innerRadius) / 2,
          thickness: (chart.outerRadius - chart.innerRadius) / 2 - 1,
          backgroundColor: arc.options.backgroundColor,
        }
        arc2.round = {
          x: (chart.chartArea.left + chart.chartArea.right) / 2,
          y: (chart.chartArea.top + chart.chartArea.bottom) / 2,
          radius: (chart.outerRadius + chart.innerRadius) / 2,
          thickness: (chart.outerRadius - chart.innerRadius) / 2 - 1,
          backgroundColor: arc2.options.backgroundColor,
        }
      }
    },

    afterDraw: function (chart) {
      if (chart.config.options.elements.arc.roundedCornersFor !== undefined) {
        var ctx = chart.ctx
        var arc =
          chart.getDatasetMeta(0).data[
          chart.config.options.elements.arc.roundedCornersFor
          ]
        var startAngle = Math.PI / 2 - arc.startAngle
        var endAngle = Math.PI / 2 - arc.endAngle
        ctx.save()
        ctx.translate(arc.round.x, arc.round.y)
        ctx.fillStyle = arc.round.backgroundColor
        ctx.beginPath()
        ctx.arc(
          arc.round.radius * Math.sin(startAngle),
          arc.round.radius * Math.cos(startAngle),
          arc.round.thickness,
          0,
          2 * Math.PI,
        )
        ctx.arc(
          arc.round.radius * Math.sin(endAngle),
          arc.round.radius * Math.cos(endAngle),
          arc.round.thickness,
          0,
          2 * Math.PI,
        )
        ctx.closePath()
        ctx.fill()
        ctx.restore()
      }
      if (chart.config.options.elements.arc.roundedCornersFor2 !== undefined) {
        var ctx = chart.ctx
        var arc =
          chart.getDatasetMeta(0).data[
          chart.config.options.elements.arc.roundedCornersFor2
          ]
        var startAngle = Math.PI / 2 - arc.startAngle
        var endAngle = Math.PI / 2 - arc.endAngle
        ctx.save()
        ctx.translate(arc.round.x, arc.round.y)
        ctx.fillStyle = arc.round.backgroundColor
        ctx.beginPath()
        ctx.arc(
          arc.round.radius * Math.sin(startAngle),
          arc.round.radius * Math.cos(startAngle),
          arc.round.thickness,
          0,
          2 * Math.PI,
        )
        ctx.arc(
          arc.round.radius * Math.sin(endAngle),
          arc.round.radius * Math.cos(endAngle),
          arc.round.thickness,
          0,
          2 * Math.PI,
        )
        ctx.closePath()
        ctx.fill()
        ctx.restore()
      }
    },
  }

  const fullWidth = window.innerWidth
  const fullHeight = window.innerWidth
  const doughnutRef = React.useRef()

  React.useEffect(() => {
    if (doughnutRef?.current?.chartInstance?.canvas) {
      doughnutRef.current.chartInstance.canvas.style.position = 'absolute'
      doughnutRef.current.chartInstance.canvas.style.zIndex = '10'
    }
  }, [doughnutRef])

  // Doughnut size according to window size
  let doughnutSize = (window.screen.width / 100) * 85
  return (
    <div
      ref={graphRef}
      style={{ width: '100%', height: '100%' }}
      className="fontSofiaPro"
    >
      {/* <div className={'text-center mb-8'}>
        <p className="fontSofiaPro text-gray-300 text-xl  font-bold">wallet</p>
        {props.currentWalletData && (
          <p className="fontSofiaPro font-bold text-4xl text-primary">
            {props.currentWalletData.walletTitle}
          </p>
        )}
      </div> */}

      <div
        style={{
          position: 'relative',
          width: doughnutSize || fullWidth,
          height: doughnutSize || fullWidth,
          margin: 'auto'
        }}
      >
        <div style={{ zIndex: 1 }}>
          <Doughnut
            width={doughnutSize || fullWidth}
            height={doughnutSize || fullWidth}
            className={classes.chartLineWallet}
            data={data}
            options={options}
            plugins={[chatInnerPlugin]}
            ref={doughnutRef}
          />
        </div>
        <div
          className=""
          style={{
            position: 'absolute',
            top: 0,
            zIndex: 15,
            left: 0,
            width: graphRef?.current?.offsetWidth || fullWidth,
            height: graphRef?.current?.offsetWidth || fullWidth,
            textAlign: 'center',
            color: 'rgba(133, 139, 173, 1)',
            display: 'flex',
            flexDirection: 'column',
            aspectRatio: '1/1',
            justifyContent: 'center',
            flexWrap: 'nowrap',
            alignItems: 'center',
          }}
        >
          {/* <img
          /> */}
          <div

            style={{
              width: '100%',
              height: '100%',
              zIndex: '16',
              transform: 'scale(1.5)',
            }}
          >

            <Image
              objectFit='contain'
              priority={true}
              quality={75}
              alt="graph-circle"
              src="/images/wallet/graphCircle.svg"
              layout="fill"
            />
          </div>
        </div>
        <div
          className="infinitRotate"
          style={{
            position: 'absolute',
            top: 0,
            zIndex: 0,
            left: 0,
            width: graphRef?.current?.offsetWidth || fullWidth,
            height: graphRef?.current?.offsetWidth || fullWidth,
            textAlign: 'center',
            color: 'rgba(133, 139, 173, 1)',
            display: 'flex',
            flexDirection: 'column',
            aspectRatio: '1/1',
            justifyContent: 'center',
            flexWrap: 'nowrap',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              zIndex: '1',
              transform: 'scale(1.02)',
            }}

          >

            <Image
              objectFit='contain'
              priority={true}
              quality={75}
              alt="graphCircleLine"
              src="/images/wallet/graphCircleLine.svg"
              layout="fill"
            />
          </div>
          {/* <img
          /> */}
        </div>

        <div
          className={`absolute top-0 flex text-center flex-col items-center justify-center ${fullHeight} ${fullWidth}`}
          style={{
            //   position: 'absolute',
            //   top: '0%',
            width: '100%',
            height: window.innerWidth - 64,
            //   textAlign: 'center',
            //   color: 'rgba(133, 139, 173, 1)',
            //   display: 'flex',
            //   flexDirection: 'column',
            //   justifyContent:'center',
            //   flexWrap: 'nowrap',
            //   alignItems: 'center',
          }}
        >
          <div
            // className="dbTag"
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: 'min-content',
              flexWrap: 'nowrap',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: 17, whiteSpace: 'nowrap' }}>
              {' '}
              Your Balance
            </div>
            <div>
              {' '}
              <Tooltip title="Refresh">
                <IconButton
                  disabled={props.refreshBalance}
                  onClick={props.refreshBalanceHandler}
                  size="small"
                  style={{
                    zIndex: '29',
                    marginLeft: 6,
                    backgroundColor: 'rgba(133, 139, 173, .4)',
                    color: 'rgba(133, 139, 173, 1)',
                    borderRadius: '4px',
                    height: 18,
                    width: 18,
                  }}
                >
                  {props.refreshBalance ? (
                    <CircularProgress size={16} thickness={4} />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                  )}
                </IconButton>
              </Tooltip>{' '}
            </div>
          </div>
          <h1 style={{ fontSize: 56 }}>
            <span className="balance-Head">$ </span>
            {props.balance && props.balance.dollarBal ? (
              props.balance.dollarBal
            ) : (
              <span className="balance-Head" style={{ fontWeight: '400' }}>
                0.0
              </span>
            )}
          </h1>
          <h1
            style={{ opacity: '0.4', fontSize: '24px', fontWeight: 'bolder' }}
          >
            {props?.balance && props?.balance?.bsvBal}
          </h1>
          <div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {' '}
              <div
                style={{
                  marginTop: '4%',
                  marginInline: '1%',
                  width: 8,
                  borderRadius: 5,
                  height: 8,
                  background: 'rgba(51, 136, 255, 1)',
                }}
              ></div>
              <div style={{ fontSize: 13, whiteSpace: 'nowrap' }}>Deposit</div>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              {' '}
              <div
                style={{
                  marginTop: '4%',
                  marginInline: '1%',
                  width: 8,
                  borderRadius: 5,
                  height: 8,
                  background:
                    'linear-gradient(111.07deg, #E70060 10.57%, #FC8F0C 105.27%)',
                }}
              ></div>
              <div style={{ fontSize: 13, whiteSpace: 'nowrap' }}>Withdraw</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BalanceGraph

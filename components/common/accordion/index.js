import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  main: {
    background: ' var(--bgLight)',
    color: 'white',
    borderRadius: 16,
    border: '0px solid white',
    marginBlock: '22px',
    paddingBlock: '5px',
    paddingInline: '5px',

    '&::before': {
      content: '"some content"',
      display: 'none',
      height: 60,
      marginTop: -60,
    },
  },
  heading: {
    fontSize: '1.3rem',
    fontWeight: '600',
    fontFamily: 'Sofia Pro',
  },
  details: {
    fontFamily: 'Sofia Pro',
    fontWeight: '400',
  },
}))
const AccordionComponent = ({
  children,
  classNames,
  heading,
  details,
  faqId,
}) => {
  const classes = useStyles()
  return (
    <Accordion classes={{ root: classes.main }} key={`${faqId}-accordionmain`}>
      <AccordionSummary
        key={`${faqId}-accordionsummary`}
        expandIcon={
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        }
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography key={`${faqId}-accordiontypo`} className={classes.heading}>
          {heading}
        </Typography>
      </AccordionSummary>
      <AccordionDetails key={`${faqId}-accordiondetails`}>
        <Typography key={`${faqId}-accordiontypo2`} className={classes.details}>
          {details}
        </Typography>
      </AccordionDetails>
    </Accordion>
  )
}
AccordionComponent.propTypes = {
  heading: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
  faqId: PropTypes.string,
}

export default AccordionComponent

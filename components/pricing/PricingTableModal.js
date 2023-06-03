import PricingTable from './PricingTable'
import { Dialog, DialogTitle } from '@material-ui/core'
import { XMarkIcon } from '@heroicons/react/24/solid'

export default function (props) {
  const { onClose } = props
  return (
    <Dialog {...props}>
      <DialogTitle>
        <div className="flex flex-1 justify-end">
          <XMarkIcon
            fill="black"
            onClick={onClose}
            className="cursor-pointer h-6 w-6"
          />
        </div>
      </DialogTitle>
      <PricingTable />
    </Dialog>
  )
}

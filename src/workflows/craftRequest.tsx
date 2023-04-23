import UserDetails from "@/components/UserDetails"
import ArmorSection from "@/components/ArmorSection"
import PaymentOptions from "@/components/PaymentOptions"

const CraftRequestWorkflow = {
  completionUri: '',
  workflow: {
    userDetails: {
      step: 1,
      component: UserDetails,
      nextStep: 'armorSelection',
      lastStep: null,
    },
    armorSelection: {
      step: 2,
      component: ArmorSection,
      nextStep: 'jewelrySelection',
      lastStep: 'userDetails',
    },
    jewelrySelection: {
      step: 3,
      component: () => (<div>JewelrySelection</div>),
      nextStep: 'weaponSelection',
      lastStep: 'armorSelection',
    },
    weaponSelection: {
      step: 4,
      component: () => (<div>weaponSelection</div>),
      nextStep: 'paymentOptions',
      lastStep: 'jewelrySelection',
    },
    paymentOptions: {
      step: 5,
      component: PaymentOptions,
      nextStep: 'notes',
      lastStep: 'weaponSelection',
    },
    notes: {
      step: 6,
      component: PaymentOptions,
      nextStep: 'notes',
      lastStep: 'paymentOptions',
    },
    review: {
      step: 6,
      component: PaymentOptions,
      nextStep: null,
      lastStep: 'notes',
    }
  }
}

export default CraftRequestWorkflow;

interface complaaint {
  complaint_id: number;
  user_id: number;
  title: string;
  description: string;
  action: string;
  invoice_required:boolean
  payment_status:boolean
  status: boolean;
  usrname:number;
}
interface clieent {
  user_id: number;
  username: string;
  email: string;
  contactdetails: string;
  system_size: number;
  date_of_installation: Date;
}

interface Insights {
  Complaint: number;
  Pending: number;
  Payed: number;
  Users: number;
}
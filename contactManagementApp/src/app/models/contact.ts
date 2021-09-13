export interface IContact {
  id: string;
  firstName: string;
  lastName: string;
  homePhoneNumber: string;
  businessPhoneNumber: string;
  mobilePhoneNumber: string;
  email: string;
}
//first name(required, max 50 characters)
//last name(required, max 50 characters)
//home phone number(optional, formatted as xxx - xxx - xxxx)
//business phone number(optional, formatted as xxx - xxx - xxxx ext.xxx)
//mobile phone number(optional, formatted as xxx - xxx - xxxx)
//e - mail address(optional, must be formatted as a valid e - mail address)

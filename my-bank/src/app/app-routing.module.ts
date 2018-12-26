import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PayFromYourOnlineBankComponent} from './pay-from-your-online-bank/pay-from-your-online-bank.component';
import {PayWithAnyBankCardComponent} from './pay-with-any-bank-card/pay-with-any-bank-card.component';
import {RequestPaymentComponent} from './request-payment/request-payment.component';
import {AdminComponent} from './admin/admin.component';
import {BankComponent} from './bank/bank.component';
import {AdminCardPaymentComponent} from './admin-card-payment/admin-card-payment.component';
import {AdminRequestPaymentComponent} from './admin-request-payment/admin-request-payment.component';
import {AdminPayFromYourOnlineBankComponent} from './admin-pay-from-your-online-bank/admin-pay-from-your-online-bank.component';

const routes: Routes = [
  {path: '',
    children: [{path: '', component: PayWithAnyBankCardComponent},
      {path: 'pay-from-your-online-bank', component: PayFromYourOnlineBankComponent},
      {path: 'request-payment', component: RequestPaymentComponent}],
    component: BankComponent},
  {path: 'admin', children: [{path: '', component: AdminCardPaymentComponent},
      {path: 'admin-pay-from-your-online-bank', component: AdminPayFromYourOnlineBankComponent},
      {path: 'admin-request-payment', component: AdminRequestPaymentComponent}],
    component: AdminComponent}
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

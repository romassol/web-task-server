import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import { FooterComponent } from './footer/footer.component';
import { LinkComponent } from './footer/link/link.component';
import { AdditionInformationComponent } from './addition-information/addition-information.component';
import { CompanyProductsComponent } from './company-products/company-products.component';
import { ProductComponent } from './company-products/product/product.component';
import { PayWithAnyBankCardComponent } from './pay-with-any-bank-card/pay-with-any-bank-card.component';
import { CardComponent } from './pay-with-any-bank-card/card/card.component';
import { SumComponent } from './pay-with-any-bank-card/sum/sum.component';
import { PayFromYourOnlineBankComponent } from './pay-from-your-online-bank/pay-from-your-online-bank.component';
import { RequestPaymentComponent } from './request-payment/request-payment.component';
import { AdminComponent } from './admin/admin.component';
import { BankComponent } from './bank/bank.component';
import { AdminCardPaymentComponent } from './admin-card-payment/admin-card-payment.component';
import { AdminRequestPaymentComponent } from './admin-request-payment/admin-request-payment.component';
import { AdminPayFromYourOnlineBankComponent } from './admin-pay-from-your-online-bank/admin-pay-from-your-online-bank.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    FooterComponent,
    LinkComponent,
    AdditionInformationComponent,
    CompanyProductsComponent,
    ProductComponent,
    PayWithAnyBankCardComponent,
    CardComponent,
    SumComponent,
    PayFromYourOnlineBankComponent,
    RequestPaymentComponent,
    AdminComponent,
    BankComponent,
    AdminCardPaymentComponent,
    AdminRequestPaymentComponent,
    AdminPayFromYourOnlineBankComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

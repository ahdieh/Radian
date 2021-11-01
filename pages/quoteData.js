import Head from "next/head";
const _ = require("lodash");
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const purchasePrice=400000;
const loanAmount=300000;
const QuoteDate = new Date().toLocaleDateString();
const rebate=random(15,20);
const originalTitleQuote=Math.ceil(purchasePrice/126);
const rebateSavings=Math.ceil((originalTitleQuote/100)*rebate);
const radianQuote=_.round(originalTitleQuote-rebateSavings);
const BuyerResponsibility=_.round(radianQuote*0.9);
const sellerResponsibility=_.round(radianQuote-BuyerResponsibility);
//-----------------------------------Seller-------------------------------//
//------------------------Title Charges--------------------------//
//-----------Seller Premium----------//
const SOTI=0;
const SLTI=0;
const SBR=0;
const STPremium=SOTI+SLTI+SBR;
//-----------Endorsements------------//
const SAE906=0;
const SAE8106=0;
const STEndorsements=SAE906+SAE8106;
//---------------------Settlement Charges---------------------//
const SCF=sellerResponsibility;
const SSF=0;
const STSettlementCharges=SCF+SSF;
//---------------------------------------------------------------//
const STitleCharges=STPremium+STEndorsements+STSettlementCharges;
//------------------------------------------------------------------------//

//-----------------------------------Buyer-------------------------------//
//---------------------Settlement Charges---------------------//
const BCF=_.round(sellerResponsibility,2);
const BSF=_.round(Math.floor(BuyerResponsibility*0.1));
const BTSettlementCharges=_.round(BCF+BSF);
//------------------------Title Charges--------------------------//
//-----------Endorsements------------//
const BAE906=_.round(Math.floor(BuyerResponsibility*0.09));
const BAE8106=_.round(Math.floor(BuyerResponsibility*0.01));
const BTEndorsements=_.round(BAE906+BAE8106);
//-----------Seller Premium----------//
const BLTI=_.round(BAE8106);
const BBR=_.round(rebateSavings);
const BOTI=_.round(BuyerResponsibility+BBR-BLTI-BTEndorsements-BTSettlementCharges);
const BTPremium=_.round(BOTI+BLTI-BBR);
//---------------------------------------------------------------//
const BTitleCharges=_.round(BTPremium+BTEndorsements+BTSettlementCharges);
//------------------------------------------------------------------------//

//------------------------------------Total----------------------------------//
//------------------------Title Charges--------------------------//
//-----------Total Premium----------//
const TOTI=SOTI+BOTI;
const TLTI=SLTI+BLTI;
const TBR=SBR+BBR;
const TTPremium=STPremium+BTPremium;
//-----------Endorsements------------//
const TAE906=SAE906+BAE906;
const TAE8106=SAE8106+BAE906;
const TTEndorsements=STEndorsements+BTEndorsements;
//---------------------Settlement Charges---------------------//
const TCF=SCF+BCF;
const TSF=SSF+BSF;
const TTSettlementCharges=STSettlementCharges+BTSettlementCharges;
//---------------------------------------------------------------//
const TTitleCharges=STitleCharges+BTitleCharges;
//Taxes & Other Government Fees
//-------------------------------------Buyer---------------------------------------------//
const BDST=0;
const BMST=(purchasePrice-loanAmount)*0.0105; 
const BMIT=(purchasePrice-loanAmount)*0.006; ;
const BMRF=BAE906;
const BDRF=BLTI;
const BTTOGF=BDST+BMST+BMIT+BMRF+BDRF;
//-------------------------------------Seller---------------------------------------------//
const SDST=BuyerResponsibility-100;
const SMST=0; 
const SMIT=0;
const SMRF=0;
const SDRF=0;
const STTOGF=SDST+SMST+SMIT+SMRF+SDRF;
//-------------------------------------Total---------------------------------------------//
const TDST=BDST+SDST;
const TMST=BMST+SMST; 
const TMIT=BMIT+SMIT;
const TMRF=BMRF+SMRF;
const TDRF=BDRF+SDRF;
const TTTOGF=BTTOGF+STTOGF;

const quoteData = () => {
  return (
    <>
      <Head>
        <title>Title Genius | Quote Data</title>
        <meta name="keywords" content="title-genius" />
      </Head>
      <div>
      <h1>Top Cards Details</h1>
      <h3>Purchase Price: {purchasePrice}</h3>
      <h3>Loan Amount: {loanAmount}</h3>
      <h3>Quote Date: {QuoteDate}</h3>
      <h3>Original Title Count: {originalTitleQuote}</h3>
      <h3>Rebate Savings: {rebateSavings}</h3>
      <h3>Radian Quote: {radianQuote}</h3>
      <h3>Buyers Responsibility: {BuyerResponsibility}</h3>
      <h3>Sellers Responsibility: {sellerResponsibility}</h3>
      <br />
      <br />
      <hr />
      <h1>Buyer Title Charges</h1>
      <h2>Premium</h2>
      <h3>Owner's Title Insurance: {BOTI}</h3>
      <h3>Lender's Title Insurance: {BLTI}</h3>
      <h3>Butlers Rebate (20%): {BBR}</h3>
      <h2>Total Premium: {BTPremium}</h2>
      <hr />
      <h2>Endorsements</h2>
      <h3>ALTA ENDORSEMENT 9-06 (Restrictions, Encroachments, Minerals): {BAE906}</h3>
      <h3>ALTA ENDORSEMENT 8.1-06 (Environmental Protection Lien): {BAE8106}</h3>
      <h2>Total Endorsements: {BTEndorsements}</h2>
      <hr />
      <h1>Settlement Charges</h1>
      <h3>Closing Fee: {BCF}</h3>
      <h3>Search Fee: {BSF}</h3>
      <h2>Total Settlement Charges: {BTSettlementCharges}</h2>
      <h1>Total Buyer Title Charges: {BTitleCharges}</h1>
      <hr />
      <hr />
      <br />
      <h1>Seller Title Charges</h1>
      <h2>Premium</h2>
      <h3>Owner's Title Insurance: {SOTI}</h3>
      <h3>Lender's Title Insurance: {SLTI}</h3>
      <h3>Butlers Rebate (20%): {SBR}</h3>
      <h2>Total Premium: {STPremium}</h2>
      <hr />
      <h2>Endorsements</h2>
      <h3>ALTA ENDORSEMENT 9-06 (Restrictions, Encroachments, Minerals): {SAE906}</h3>
      <h3>ALTA ENDORSEMENT 8.1-06 (Environmental Protection Lien): {SAE8106}</h3>
      <h2>Total Endorsements: {STEndorsements}</h2>
      <hr />
      <h1>Settlement Charges</h1>
      <h3>Closing Fee: {SCF}</h3>
      <h3>Search Fee: {SSF}</h3>
      <h2>Total Settlement Charges: {STSettlementCharges}</h2>
      <h1>Total Seller Title Charges: {STitleCharges}</h1>
      <hr />
      <hr />
      <br />
      <hr />
      <hr />
      <br />
      <h1>Total Title Charges</h1>
      <h2>Premium</h2>
      <h3>Owner's Title Insurance: {TOTI}</h3>
      <h3>Lender's Title Insurance: {TLTI}</h3>
      <h3>Butlers Rebate (20%): {TBR}</h3>
      <h2>Total Premium: {TTPremium}</h2>
      <hr />
      <h2>Endorsements</h2>
      <h3>ALTA ENDORSEMENT 9-06 (Restrictions, Encroachments, Minerals): {TAE906}</h3>
      <h3>ALTA ENDORSEMENT 8.1-06 (Environmental Protection Lien): {TAE8106}</h3>
      <h2>Total Endorsements: {TTEndorsements}</h2>
      <hr />
      <h1>Settlement Charges</h1>
      <h3>Closing Fee: {TCF}</h3>
      <h3>Search Fee: {TSF}</h3>
      <h2>Total Settlement Charges: {TTSettlementCharges}</h2>
      <h1>Total Title Charges: {TTitleCharges}</h1>
      <hr />
      <hr />
      <br />
      <h1>Buyer Taxes and Government Fees</h1>
      <h3>Deed State Tax: {BDST}</h3>
      <h3>Mortgage State Tax: {BMST}</h3>
      <h3>Mortgage Intangible Tax: {BMIT}</h3>
      <h3>Mortgage Recording Fee: {BMRF}</h3>
      <h3>Deed Recording Fee: {BDRF}</h3>
      <h2>Total Taxes and Other Government Fees: {BTTOGF}</h2>
      <hr />
      <hr />
      <br />
      <h1>Seller Taxes and Government Fees</h1>
      <h3>Deed State Tax: {SDST}</h3>
      <h3>Mortgage State Tax: {SMST}</h3>
      <h3>Mortgage Intangible Tax: {SMIT}</h3>
      <h3>Mortgage Recording Fee: {SMRF}</h3>
      <h3>Deed Recording Fee: {SDRF}</h3>
      <h2>Total Taxes and Other Government Fees: {STTOGF}</h2>
      <hr />
      <hr />
      <br />
      <h1>Buyer Taxes and Government Fees</h1>
      <h3>Deed State Tax: {TDST}</h3>
      <h3>Mortgage State Tax: {TMST}</h3>
      <h3>Mortgage Intangible Tax: {TMIT}</h3>
      <h3>Mortgage Recording Fee: {TMRF}</h3>
      <h3>Deed Recording Fee: {TDRF}</h3>
      <h2>Total Taxes and Other Government Fees: {TTTOGF}</h2>
    </div>
    </>
  );
};

export default quoteData;

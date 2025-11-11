import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import TopHeader from '../../components/TopHeader';
import TermsAccordian from '../../components/TermsAccordian';
import {Colors} from '../../utilis/Colors';

const TermsnCondition = () => {
  const navigation = useNavigation();
  const [openIndex, setOpenIndex] = useState(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const accordionRefs = useRef<Array<View | null>>([]);
  // const handleAccordionToggle = (index: any) => {
  //   setOpenIndex(prevIndex => (prevIndex === index ? null : index));
  // };

  const handleAccordionToggle = (index: number) => {
    setOpenIndex(prevIndex => {
      const newIndex = prevIndex === index ? null : index;
      if (newIndex !== null) {
        // Scroll to the top of the opened accordion
        setTimeout(() => {
          scrollViewRef.current?.scrollTo({
            y: index * 200, // Adjust this value based on your accordion height
            animated: true,
          });
        }, 100); // Small delay to ensure the accordion is rendered
      }
      return newIndex;
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <TopHeader title="Terms & Conditions" />
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: '#fff',
          width: '100%',
          height: '100%',
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          marginTop: 20,
          paddingHorizontal: 20,
          paddingTop: 20,
        }}>
        <TermsAccordian
          ref={(ref: any) => (accordionRefs.current[0] = ref)}
          title={<Text>1. General Conditions</Text>}
          content={
            <Text>
              <Text style={{fontWeight: 'bold'}}>
                1.1 User Agreement{'\n'}
                {'\n'}
              </Text>
              The Owner of these General Terms and Conditions for Auction
              Purchases (in short, “Auction Terms“) shall be Otoz.Ai (Commercial
              Register: District Court of Tokyo). The object of these Auction
              Terms is to regulate the sale of movable property by the Owner,
              businesses, or private persons (hereafter referred to as the
              “Seller”) to persons who are also businesses (hereafter referred
              to as the “Buyer”). Sales shall be arranged and conducted via
              Otoz.Ai. These Auction Terms form the legal basis between Otoz.Ai,
              the Seller and the Buyer (the “contracting parties”). Where
              reference to “vehicles” is made in these Auction Terms, they may
              also include other objects for sale at an auction. The current
              version of the following Auction Terms shall also apply for future
              transactions between the contracting parties. Other general
              business terms shall not apply here, even if not explicitly
              contradicted.{'\n'}
              {'\n'}
              <Text style={{fontWeight: 'bold'}}>
                1.2 Exemption from Liability{'\n'}
                {'\n'}
              </Text>
              The User of the Internet platform shall release Otoz.Ai from all
              claims that other Users or third parties may make against Otoz.Ai,
              whether through violation of their rights in the offers and
              subject matter a User places on the website, or through his using
              the Otoz.Ai website for other purposes. The User shall also bear
              the costs of any legal defense Otoz.Ai may require, including all
              court and solicitor's costs. This shall not apply if the User is
              not responsible for the infringement.
            </Text>
          }
          isOpen={openIndex === 0}
          onPress={() => handleAccordionToggle(0)}
        />
        <TermsAccordian
          ref={(ref: any) => (accordionRefs.current[1] = ref)}
          title={<Text>2. Registration, Use of the Internet Platform</Text>}
          content={
            <Text style={{textAlign: 'justify'}}>
              <Text style={{fontWeight: 'bold', textAlign: 'justify'}}>
                2.1 Registration Procedure{'\n'}
                {'\n'}
              </Text>
              A User must register to use all the services Otoz.Ai offers.
              No-one is entitled to register at Otoz.Ai. Registration is free
              and carried out by the User opening a user account and agreeing to
              these Auction Terms. By registering, a contract on the use of the
              Otoz.Ai Internet platform is concluded between Otoz.Ai and the
              User. The data provided for Otoz.Ai at registration must be
              accurate and complete. Should there be a change in user data after
              registration, the User shall be obliged to notify Otoz.Ai of this
              change at once. Upon registration, the User shall select a
              Username and password. The User's name may not violate third party
              rights, particularly not trade names or copyrights. The password
              must be kept confidential. The User shall be liable for the misuse
              of a User name or password. A User's account is not transferable.
              {'\n'}
              {'\n'}
              <Text style={{fontWeight: 'bold'}}>
                2.2 Use of the Internet Platform{'\n'}
                {'\n'}
              </Text>
              The Internet platform and other Otoz.Ai websites may contain links
              to other Internet sites. Otoz.Ai has no influence on the design
              and subject matter of these site links. Otoz.Ai shall not be
              responsible for the topicality, accuracy, entirety or quality of
              the information provided on them and expressly dissociates itself
              from all subject matter on any such sites. When using Otoz.Ai
              websites, the User is not entitled to employ any devices,
              soft-ware or other practices likely to affect the functioning of
              the Internet platform. The User may not employ any measures likely
              to result in unreasonable or excessive infrastructure loads.
              Subject matter on the Otoz.Ai Internet platform may not be copied,
              passed on, used or reproduced in any way without the owner's prior
              permission. This shall also apply for “robot/crawler” search
              engine copies, “screen scraping” and other automatic devices. The
              layout of Otoz.Ai websites may only be reproduced and/or used on
              other websites with Otoz.Ai prior written permission.
              {'\n'}
              {'\n'}
              <Text style={{fontWeight: 'bold'}}>
                2.3 Freezing of Accounts{'\n'}
                {'\n'}
              </Text>
              Otoz.Ai may freeze a user account at any time, especially in the
              case of violations against the general and particular Auction
              Terms. As soon as a user account is frozen, the User may no longer
              use the Otoz.Ai website or re-register without Otoz.Ai express
              permission.
              {'\n'}
              {'\n'}
              <Text style={{fontWeight: 'bold'}}>
                2.4 Termination of Contract{'\n'}
                {'\n'}
              </Text>
              The User may terminate his user contract at any time, without
              notice. Written notification or an e-mail to
              customercenter@Otoz.Ai shall serve to state termination.
            </Text>
          }
          isOpen={openIndex === 1}
          onPress={() => handleAccordionToggle(1)}
        />
        <TermsAccordian
          ref={(ref: any) => (accordionRefs.current[2] = ref)}
          title={<Text>3. Concluding a Contract in an Auction</Text>}
          content={
            <Text style={{textAlign: 'justify'}}>
              <Text style={{fontWeight: 'bold', textAlign: 'justify'}}>
                3.1 Otoz.Ai Auction Conditions{'\n'}
                {'\n'}
              </Text>
              Users may not manipulate the course of an auction by making bids
              via another user account or through the express intervention of a
              third party. The Seller, in particular, shall be prohibited from
              placing bids on the objects he is auctioning during the bidding
              period. The auctioning of objects is prohibited where their
              tendering, sale, or purchase violates the statutory regulations or
              the rules of common decency. In particular, objects may not be
              described or put up for auction if their advertising, tendering or
              sale violates copyright and intellectual property rights,
              industrial property rights or any other rights (e.g. the right to
              one’s own image, name and personality).
              {'\n'}
              {'\n'}
              <Text style={{fontWeight: 'bold'}}>
                3.2 Auction Procedure{'\n'}
                {'\n'}
              </Text>
              The beginning, end and course of an auction shall be controlled by
              Otoz.Ai. It reserves the right to cancel or alter scheduled
              auctions. Only in exceptional cases shall Otoz.Ai be entitled to
              invalidate auctions without given reason, without a legal claim
              ensuing on the User's part. Invalidation may take place before or
              during an auction.
              {'\n'}
              {'\n'}
              <Text style={{fontWeight: 'bold'}}>
                3.3 Placing Items for Auction{'\n'}
                {'\n'}
              </Text>
              The Seller must place objects for auction in the appropriate
              category, with a correct and complete written and illustrated
              description. This shall include an accurate indication of all the
              essential properties and features required to make a purchase, and
              any defects likely to reduce the object's value, i.e be a truthful
              statement of its actual condition. Furthermore, the Seller must
              give Users full information as to who owns the object under
              tender, the owner's right to put it up for auction, and the
              details of payment and collection. The description and images used
              must not violate third party rights and must refer solely to the
              object under tender (original photographs). Descriptions, drawings
              and photographs may not contain any advertising for anything other
              than the object under tender, and especially not include links to
              a personal website, telephone numbers, etc. Where Otoz.Ai is the
              Seller, objects being auctioned will be described by a contract
              partner or service provider, without Otoz.Ai conducting a second
              appraisal.
              {'\n'}
              {'\n'}
              <Text style={{fontWeight: 'bold'}}>
                3.4 Description Discrepancies{'\n'}
                {'\n'}
              </Text>
              Should, in the Buyer's view, the defects of an object on auction
              exceed those described by the Seller, Otoz.Ai is entitled to
              obtain an expert opinion, which shall be binding for the partners
              to the contract. The ensuing costs shall be paid by the party
              responsible for an established or non-established discrepancy; if
              only a slight, or no discrepancy is ascertained, the ensuing costs
              shall be borne by the Buyer. Faulty descriptions of objects worth
              up to USD 1000.00 are deemed immaterial and will not be
              contemplated. See Sect. 4.3.1. for further information.
              {'\n'}
              {'\n'}
              <Text style={{fontWeight: 'bold'}}>
                3.5 Placement{'\n'}
                {'\n'}
              </Text>
              By placing an object on an Otoz.Ai website, the Seller declares
              his prior binding acceptance of a Bidder’s highest offer at the
              end of the bidding period, as long as the bid meets the minimum
              stipulated price. The Seller also expressly declares his agreement
              to sell the auctioned object to the bidder should no higher bids
              be made.
              {'\n'}
              {'\n'}
              <Text style={{fontWeight: 'bold'}}>
                3.6 Bidding Rules, Binding Period{'\n'}
                {'\n'}
              </Text>
              The Bidder shall make a bid by entering a sum of money within the
              bidding period. All offers shall be gross amounts. Should two
              bidders offer the same price, the first bid to be entered shall be
              considered the higher. The Bidder's bid shall be binding until
              invalidated by a higher bid. Should the Bidder not be outbid and
              the floor price not met, the offer shall remain valid for a
              48-hour period (working days) following the end of the online
              auction, unless another ruling is agreed to. Bids already
              submitted may not be lowered or invalidated unless the Bidder has
              legal permission to do so, for example via the rescission
              regulations of the Japan Civil Code. All submitted bids will be
              registered and stored by Otoz.Ai. It will resolve any
              uncertainties that arise regarding bids in a manner binding for
              all the contracting parties.
              {'\n'}
              {'\n'}
              <Text style={{fontWeight: 'bold'}}>
                3.7 Sales Agreement{'\n'}
                {'\n'}
              </Text>
              As long as the floor price is attained, at the end of the online
              auction a sales agreement will be concluded between the Seller and
              the highest bidder, in which their rights and obligations shall
              primarily be in accordance with Sections 4, 5, and 6 of these
              Auction Terms. When an object has been purchased, Otoz.Ai shall
              send the sales contract to the Seller and the Buyer. The contracts
              Otoz.Ai sends must be checked for accuracy. At the same time, they
              will be placed on the respective user accounts at Otoz.Ai.
            </Text>
          }
          isOpen={openIndex === 2}
          onPress={() => handleAccordionToggle(2)}
        />
        <TermsAccordian
          ref={(ref: any) => (accordionRefs.current[3] = ref)}
          title={<Text>4. Collection and Buyer's Right of Inspection</Text>}
          content={
            <Text style={{textAlign: 'justify'}}>
              <Text style={{fontWeight: 'bold', textAlign: 'justify'}}>
                4.1 Location{'\n'}
                {'\n'}
              </Text>
              Purchased vehicles/objects must be collected by the Buyer at his
              own expense, from the location stated by the Seller in his notice
              of sale or on the website. The Seller shall provide the address of
              the location. Should no exact address be indicated in the postal
              code area, the vehicle shall be picked up at the Seller’s address.
              {'\n'}
              {'\n'}
              <Text style={{fontWeight: 'bold'}}>
                4.2 Collection Deadline / Lump Sum Compensation{'\n'}
                {'\n'}
              </Text>
              All vehicles must be collected by the Buyer at the stated
              location, within 5 working days of receiving a so-called
              "notification of release". Notification generally follows
              immediately after payment of the purchase price has been received.
              Where payment is not handled by Otoz.Ai, the Buyer is obliged to
              pick up vehicles within 5 working days after receiving Otoz.Ai
              electronic sales contracts. Should these terms not be complied
              with, Otoz.Ai reserves the right to invalidate the purchase due to
              default (of the payment periods stated in the contract and the
              final date of payment stated in the invoice) and to market the
              vehicle elsewhere. The Buyer shall be sent a reminder to pay that
              states the lump compensation sum, following which he shall be
              invoiced for the auction fees, an additional handling fee of
              $500.00 and, if need be, any price reductions resulting from a
              subsequent sale and any demurrage costs incurred by the dealer.
              The Buyer shall be permitted to provide proof that Otoz.Ai
              incurred significantly lower damages or none at all.
              {'\n'}
              {'\n'}
              <Text style={{fontWeight: 'bold'}}>
                4.3 Buyer’s Warranty Claims for Defects{'\n'}
                {'\n'}
              </Text>
              Conditions / Inspection The sale of second-hand objects shall
              essentially be on a "purchase as is” basis, i.e. without any
              warranty. The Buyer is therefore obliged to inspect a vehicle
              thoroughly prior to acceptance, to determine whether it matches
              the description of the vehicle under auction. Obvious defects
              likely to impair the object's value must be contested on the spot,
              and the Seller and Otoz.Ai reprimanded within 48 hours. Otoz.Ai
              must be notified by telephone of such defects prior to this on:
              +813 6435 2269 1, by Telefax, on: +81 3 6733 8578 or by email, at:
              customercenter@Otoz.Ai ; failing a Fax message, immediate written
              notification should also be sent. The vehicle shall remain at the
              same location. Should a vehicle diverge from the vehicle
              description in ways not apparent before collection, even during
              proper inspection, substantiation of such defects should be
              presented to Otoz.Ai within 5 working days in the form of an
              expert's report . The report should include particulars on whether
              the unnoticed defect already existed before collection. Only the
              reduced market value of the vehicle as stated in the expert's
              report may be reimbursed, less a sum of $500.00. No claims will be
              recognized if a vehicle is collected and driven more than 100 KM
              under its own power. In addition, Section 3.4 and Section 7
              (regarding the deduction of $1000.00) shall apply. Price
              Reductions Sections 3.4 and 4.3.1 shall apply in the event of a
              substantial discrepancy in the description. Section 7 shall remain
              unaffected.
            </Text>
          }
          isOpen={openIndex === 3}
          onPress={() => handleAccordionToggle(3)}
        />
        <TermsAccordian
          ref={(ref: any) => (accordionRefs.current[4] = ref)}
          title={
            <Text>
              5. Other Rights and Obligations of the Parties to the Contract
            </Text>
          }
          content={
            <Text style={{textAlign: 'justify'}}>
              <Text style={{fontWeight: 'bold', textAlign: 'justify'}}>
                5.1 Transfer of Risk{'\n'}
                {'\n'}
              </Text>
              When a vehicle is accepted, the risk of accidental deterioration
              and destruction shall pass to the Buyer or his agent.
              {'\n'}
              {'\n'}
              <Text style={{fontWeight: 'bold'}}>
                5.2 Seller's Obligations{'\n'}
                {'\n'}
              </Text>
              Particulars on how the object under auction is equipped and
              descriptions of its condition shall be drawn up by the Seller, or
              the experts engaged by him, and be incorporated in the
              descriptions to the best of their knowledge and belief.
              {'\n'}
              {'\n'}
              <Text style={{fontWeight: 'bold'}}>
                5.3 Seller 's Rights{'\n'}
                {'\n'}
              </Text>
              The Seller shall be entitled to withdraw from a contract should
              the Buyer declare his credit status incorrectly, stop payments or
              have applied for insolvency or composition proceedings for his
              assets. Should the sold object be damaged, lost or destroyed
              before risk is transferred to the Buyer, through no fault of the
              Seller, the Seller shall be entitled to withdraw from the sales
              agreement if he reports the damage, loss or destruction to the
              Buyer at once and returns the purchase price to him immediately.
              No further claims shall exist after a withdrawal and purchase
              price reimbursement of this kind.
            </Text>
          }
          isOpen={openIndex === 4}
          onPress={() => handleAccordionToggle(4)}
        />
        <TermsAccordian
          ref={(ref: any) => (accordionRefs.current[5] = ref)}
          title={<Text>6. Purchase Price, Payment, Fees</Text>}
          content={
            <Text style={{textAlign: 'justify'}}>
              <Text style={{fontWeight: 'bold', textAlign: 'justify'}}>
                6.1 Purchase Price and Tax{'\n'}
                {'\n'}
              </Text>
              Buyers from the Federal Republic of Germany The purchase price
              shall be equivalent to the highest bid, and, unless other
              arrangements for the respective vehicle are expressly stated in
              its sales description, shall include the statutory rate of
              Turnover Tax (on the gross purchase price) applicable in Japan.
              The Seller shall provide Japanese buyers with a proper invoice
              indicating the net purchase price and the statutory Turnover Tax
              applicable. However, the preceding sentence shall not apply if the
              sale is subject to differential taxation according to Section 25a
              of the Turnover Tax Law. Buyers from other countries than Japan
              Before placing bids on objects subject to regular Turnover Tax,
              Buyers from outside of Japan must notify the Seller in writing of
              their valid international Turnover Tax identification number;
              Turnover Tax need not be paid on the net purchase price, so the
              purchase price shall only be the net purchase price. Buyers from
              Non-EU States (Third Countries) Buyers from non-EU states (third
              countries) must pay the Seller a security deposit as per agreed
              upon.
              {'\n'}
              {'\n'}
              <Text style={{fontWeight: 'bold'}}>
                6.2 Payment{'\n'}
                {'\n'}
              </Text>
              Otoz.Ai , of 2-10-13 , in 106-0047 Minami Azabu Minato Ku Tokyo
              Tokyoam, will issue a gross invoice for all vehicles sold through
              this platform. The purchase price must be paid in full to Otoz.Ai
              by bank transfer, prior to collection. The transfer must be
              effected within 3 working days after a bid has been accepted.
              Otoz.Ai may put vehicles not paid for within this period up for
              sale elsewhere. In this case, Otoz.Ai will send the Buyer a
              written request for final payment with a deadline of 1 working
              day, notifying him that the vehicle will be offered for sale
              elsewhere, and stating any differential amounts or additional
              expenses this will entail. Any bank fees incurred shall be paid by
              the Buyer. If Otoz.Ai is not the Seller, the Buyer shall pay the
              purchase amount when the vehicle's official registration papers
              and any other vehicle-related documents are exchanged at the time
              the vehicle is handed over. The goods shall remain the property of
              the Seller until full payment has been effected.
              {'\n'}
              {'\n'}
              <Text style={{fontWeight: 'bold'}}>
                6.3 Fees{'\n'}
                {'\n'}
              </Text>
              The Buyer and Seller shall each pay auction fees according to the
              amounts stipulated in the current Otoz.Ai price list. When a
              vehicle is sold to a foreign Buyer, Otoz.Ai shall charge a
              document handling fee and escrow fee if services are applied at
              the cost as per the fee chart of Otoz.Ai , which shall be paid by
              the Buyer. Fees are due immediately after receipt of the invoice
              and may be remitted by bank transfer. The amount stated on the
              invoice shall include (in writing) the Value Added Tax applicable
              on the date of issue. Invoicing shall be by post; simultaneously
              the invoice will be placed online, so accessible for printing out
              on the respective User's account. Section 6.2 shall apply in this
              case; the User will be in default after a period of two weeks
              following the invoice date and be sent no reminder to pay. The fee
              due to Otoz.Ai will be credited to the respective partner to the
              contract if the other partner to the agreement does not duly
              fulfill a contract concluded via the Otoz.Ai website.
            </Text>
          }
          isOpen={openIndex === 5}
          onPress={() => handleAccordionToggle(5)}
        />
        <TermsAccordian
          ref={(ref: any) => (accordionRefs.current[6] = ref)}
          title={<Text>7. Limitation on Liability</Text>}
          content={
            <Text style={{textAlign: 'justify'}}>
              <Text style={{fontWeight: 'bold', textAlign: 'justify'}}>
                7.1 Limitation on Liability{'\n'}
                {'\n'}
              </Text>
              Without exception, Otoz.Ai shall only be liable to compensate for
              damages – on whatever legal grounds – in cases of specific intent
              and gross negligence. In cases of simple negligence, Otoz.Ai shall
              only be liable for:
              {'\n'}
              a. Damages from injury to life, limb or health;
              {'\n'}
              b. Damages from violation of a fundamental contractual obligation
              (an obligation which facilitates the proper execution of a
              contract through its fulfillment and on the compliance of which
              the contracting partners may always rely). In this case, however,
              the liability of Otoz.Ai shall be limited to the replacement of
              foreseeable, standard damages.
              {'\n'}
              The limitations on liability resulting from this section shall not
              apply should Otoz.Ai fraudulently withhold a defect or take on a
              warranty for an object's condition.
            </Text>
          }
          isOpen={openIndex === 6}
          onPress={() => handleAccordionToggle(6)}
        />
        <TermsAccordian
          ref={(ref: any) => (accordionRefs.current[7] = ref)}
          title={<Text>8. Data Protection</Text>}
          content={
            <Text style={{textAlign: 'justify'}}>
              <Text style={{fontWeight: 'bold', textAlign: 'justify'}}>
                8.1 Data Protection{'\n'}
                {'\n'}
              </Text>
              In the event of a contract being concluded between the contracting
              parties on the Internet platform, Otoz.Ai will pass on the data
              they require to contact each other. The contracting partner in
              question shall agree to Otoz.Ai passing on his particulars
              (delivery address, bank account number) to the relevant partner to
              the contract at the end of the auction period, so the contract may
              be concluded. This shall only apply to Bidders who have placed the
              highest bids or to those who become contracting partners due to
              other agreements.
              {'\n'}
              All partners to contracts are strictly prohibited from engaging in
              any kind of advertising with the postal or e-mail addresses, or
              the contact information thus obtained.
              {'\n'}
              In addition, the contracting parties shall agree to their personal
              data – i.e. particulars collected and/or entered on the Otoz.Ai
              Internet platform during the registration process, the setting up
              and handling of a contract, or any other procedure – being stored
              on Otoz.Ai servers. Otoz.Ai will only process and use such data in
              the execution and handling of the rights and obligations for which
              it is responsible under the contractual relationship.
              {'\n'}
              Otoz.Ai shall be entitled to process, use and transfer personal
              data to the prosecuting authority, even after the end of a User
              relationship, to help safeguard overriding interests when
              clarifying misuse of the Internet platform and for prosecution
              purposes.
            </Text>
          }
          isOpen={openIndex === 7}
          onPress={() => handleAccordionToggle(7)}
        />
        <TermsAccordian
          ref={(ref: any) => (accordionRefs.current[8] = ref)}
          title={
            <Text>
              9. Governing Law, Place of Jurisdiction, Other Provisions
            </Text>
          }
          content={
            <Text style={{textAlign: 'justify'}}>
              <Text style={{fontWeight: 'bold', textAlign: 'justify'}}>
                9.1 Governing Law, Place of Jurisdiction, Other Provisions{'\n'}
                {'\n'}
              </Text>
              The Seller/Buyer place of performance and place of jurisdiction
              shall be the Seller’s address, even for legal action, should a
              claim concerning the payment of bills of exchange or cheques be
              asserted.
              {'\n'}
              Should the contracting parties be businesses, unless other
              agreements have been made, only the substantive law of the Federal
              Republic of Japan shall apply – excluding the UN Convention on
              Contracts for the International Sale of Goods – for contracts
              concluded on the Otoz.Ai Internet platform. The sole place of
              jurisdiction for legal disputes with Otoz.Ai shall be Tokyo,
              Japan.
              {'\n'}
              Should separate parts of these Auction Terms be or become invalid,
              this does not relieve the Buyer of his obligation to accept the
              purchased goods and comply with the other terms of the agreement.
              The validity of the other provisions will not be affected by this.
              In this case, the contracting parties shall agree that the invalid
              provision shall be substituted by one that economically comes
              closest to the original provision.
              {'\n'}
              Buyer’s rights arising from the purchase agreement shall not be
              transferable.
            </Text>
          }
          isOpen={openIndex === 8}
          onPress={() => handleAccordionToggle(8)}
        />
        <TermsAccordian
          ref={(ref: any) => (accordionRefs.current[9] = ref)}
          title={<Text>10. Privacy Policy</Text>}
          content={
            <Text style={{textAlign: 'justify'}}>
              <Text style={{fontWeight: 'bold', textAlign: 'justify'}}>
                10.1 Introduction{'\n'}
                {'\n'}
              </Text>
              Detailed privacy notice for personal information collected by
              Otoz.Ai. When you use our services, we use your personal
              information. This privacy notice is meant to inform you, the “data
              subject”, how we use your personal information. Protection of your
              personal information is important and we encourage you to read
              this privacy notice. If you have trouble reading this privacy
              notice or require help to understand it, please contact us
              (telephone: +81 3 6435 2269) and we will help you the best we can.
              We also use cookies. Please click on the Cookie Icon in the bottom
              left corner of the screen for details on how we use cookies.
              <Text style={{fontWeight: 'bold', textAlign: 'justify'}}>
                {'\n'}
                {'\n'}
                10.2 Contact{'\n'}
                {'\n'}
              </Text>
              Your personal information is protected by law through the General
              Data Protection Regulation of Japan.
              <Text style={{fontWeight: 'bold', textAlign: 'justify'}}>
                {'\n'}
                {'\n'}
                10.3 People Who Sign Up to Otoz.Ai Services{'\n'}
                {'\n'}
              </Text>
              When signing up as a user of Otoz.Ai services you enter into an
              agreement to which Otoz.Ai requires your contact information to
              honor. Your information will be used for the performance of
              Otoz.Ai services and to verify your identity.
              {'\n'}
              {'\n'}
              Unless there is a legal claim we intend to delete, or anonymize,
              the data collected from you while browsing our sites 1 year after
              your last login or 5 years after you last purchased or sold any
              vehicle or goods. Please allow a margin of time as we do not check
              for information to delete every day.
              {'\n'}
              {'\n'}
              There are certain cases where we share your personal information,
              collected when signing up to Otoz.Ai services, with third parties
              in order to perform the agreed service. These cases include, but
              are not limited to, when you sell or purchase vehicles or goods,
              when you fail to pay legitimate invoices from Otoz.Ai , when we
              invoice, when we refund payment, when asked by the authorities in
              relation to crime investigations and more.
              {'\n'}
              {'\n'}
              The categories of recipients are:
              {'\n'}
              {'\n'}. Financial auditors {'\n'}. Buyer of vehicles or goods you
              sell {'\n'}. Seller of vehicles or goods you buy {'\n'}. Our bank{' '}
              . Our debt collection company {'\n'}. Our debt recovery company{' '}
              {'\n'}. Digital contract signing company {'\n'}. The authorities{' '}
              {'\n'}. Our partners hosting our web sites and Internet services{' '}
              {'\n'}. Our data backup partners {'\n'}. SMS service providers{' '}
              {'\n'}. Car parks where you retrieve or deliver vehi or from you
              {'\n'}
              {'\n'}
              We will transfer your contact information to countries outside of
              the EU union in the cases where you purchase or sell vehicles or
              goods outside of the EU union.
              {'\n'}
              {'\n'}
              Otoz.Ai uses a standard contractual clause to ensure proper
              protection of your personal information in the absence of an
              adequate decision pursuant to Article 45(3) of the GDPR.
              {'\n'}
              <Text style={{fontWeight: 'bold', textAlign: 'justify'}}>
                {'\n'}
                {'\n'}
                10.4 People Browsing Our Website{'\n'}
                {'\n'}
              </Text>
              We collect information on which pages you visit, which vehicles
              you look at, which vehicles you add to your favorite list, which
              campaign brought you to our sites etc. This is used to recommend
              relevant vehicles to you, for marketing purposes and to optimize
              the user experience and flow with the goal of improving sales. We
              also use the information collected to suggest potential buyers to
              our sales team.
              {'\n'}
              {'\n'}
              Unless there is a legal claim we intend to delete, or anonymize,
              the data collected from you while browsing our sites 1 year after
              your last login or 5 years after you last purchased or sold any
              vehicle or goods. Please allow a margin of time as we do not check
              for information to delete every day.
              {'\n'}
              {'\n'}
              We have a legal interest in optimizing our sales which we believe
              is a legal reason to collect and process your information based on
              your browsing our website.
              <Text style={{fontWeight: 'bold', textAlign: 'justify'}}>
                {'\n'}
                {'\n'}
                10.5 People Using Otoz.Ai Service Desk or by Other Means Asking
                for Support{'\n'}
                {'\n'}
              </Text>
              We are always happy to help when you have issues with our
              services. We have a legitimate interest in helping our customers
              to use our services.
              {'\n'}
              {'\n'}
              We use third party systems for tracking our support requests and
              the personal information you provide for support purposes might be
              stored at an external partner.
              {'\n'}
              {'\n'}
              In cases where you request support for a sub system we might have
              to share the personal information you provide for support purposes
              in order to get the required support from our partners.
              {'\n'}
              {'\n'}
              We will delete, or anonymize, the personal information you provide
              for support purposes a maximum of two years after your request has
              been resolved.
              <Text style={{fontWeight: 'bold', textAlign: 'justify'}}>
                {'\n'}
                {'\n'}
                10.6 People Who Misbehave{'\n'}
                {'\n'}
              </Text>
              We keep an internal record of users who severely misbehave. This
              can be that they refuse to pay justified buyers or sellers fees,
              repeatedly bullying the seller when picking up a car, trying to
              cheat and much more.
              {'\n'}
              {'\n'}
              We have a legal interest in keeping our services professional,
              which very much means that we try to ensure that our buyers and
              sellers are acting professional.
              {'\n'}
              {'\n'}
              In cases where you request support for a sub system we might have
              to share the personal information you provide for support purposes
              in order to get the required support from our partners.
              {'\n'}
              {'\n'}
              In cases where a law has been broken or there is a legal claim, we
              will share this information with relevant parties like:
              {'\n'}
              {'\n'}
              {'     '}. Authorities
              {'\n'}
              {'     '}. Lawyers
              {'\n'}
              {'\n'}
              This information can also be relevant for financial auditing as it
              might be used as documentation for loss of profit. In this case
              the information will be shared with:
              {'\n'}
              {'\n'}
              {'     '}. Financial auditors
              {'\n'}
              {'\n'}
              Unless there is a legal claim, or the offense is so severe that
              there is legal justification for a longer retention period, we
              intend to delete or anonymize this information 5 years after you
              last purchased or sold any vehicle or goods. Please allow a margin
              of time as we do not check for information to delete every day.
              <Text style={{fontWeight: 'bold', textAlign: 'justify'}}>
                {'\n'}
                {'\n'}
                10.7 People Buying and Selling Vehicles{'\n'}
                {'\n'}
              </Text>
              In order to facilitate a sale the buyer and seller must exchange
              personal information and Otoz.Ai is providing this information to
              both parties as part of the agreement made when signing up to
              Otoz.Ai services. Some trades are done with a middleman where the
              buyer and seller do not share personal information. When an
              auction ends, Otoz.Ai will try to contact potential buyers as well
              as the seller and try to negotiate the sale.
              {'\n'}
              {'\n'}
              We will transfer your contact information to countries outside of
              the EU union in the cases where you purchase or sell vehicles or
              goods outside of the EU union
              {'\n'}
              {'\n'}
              Otoz.Ai uses a standard contractual clause to ensure proper
              protection of your personal information in absence of an adequate
              decision pursuant to Article 45(3) of the GDPR.
              {'\n'}
              {'\n'}
              Unless there is a legal claim we intend to delete, or anonymize,
              the data collected from you after 5 years after you last purchased
              or sold any vehicle or goods. Please allow a margin of time as we
              do not check for information to delete every day.
              {'\n'}
              {'\n'}
              Otoz.Ai is legally obligated to report imported and exported goods
              to INTRASTAT in which case provide them with the, by law, required
              personal information.
              {'\n'}
              {'\n'}
              Otoz.Ai is legally obligated to deregister vehicles before export
              or document that it has been done. When deregistering, your
              personal information will be shared with the relevant authorities.
              <Text style={{fontWeight: 'bold', textAlign: 'justify'}}>
                {'\n'}
                {'\n'}
                10.8 People Who Get a Refund{'\n'}
                {'\n'}
              </Text>
              If we need to refund a payment, we need your bank account
              information in order to transfer money back to you. You can refuse
              this if you prefer, but it will mean longer expedition time and
              that we cannot make a direct transfer. We refund money based on a
              legal interest in treating our customers fair in order to promote
              future trade and cooperation.
              {'\n'}
              {'\n'}
              We will share your account information with:
              {'\n'}
              {'\n'}
              {'     '}. Our bank
              {'\n'}
              {'     '}. Financial auditors
              {'\n'}
              {'\n'}
              Your bank account information will be deleted 5 years after the
              last refund. Please allow a margin of time as we do not check for
              information to delete every day.
              <Text style={{fontWeight: 'bold', textAlign: 'justify'}}>
                {'\n'}
                {'\n'}
                10.9 People Who Refuse to Pay{'\n'}
                {'\n'}
              </Text>
              Otoz.Ai have a legal interest in customers paying what is owed. We
              will try to collected overdue payments.
              {'\n'}
              {'\n'}
              When Otoz.Ai and the customer cannot agree on a way of payment, we
              will use a third party to recover the money and in that case share
              relevant personal information with the debt recovery company.
              {'\n'}
              {'\n'}
              Unless there is a legal claim we intend to delete, or anonymize,
              the data collected from you 5 years after the last overdue amount
              was cleared or cancelled. Please allow a margin of time as we do
              not check for information to delete every day.
              <Text style={{fontWeight: 'bold', textAlign: 'justify'}}>
                {'\n'}
                {'\n'}
                10.10 Your Rights{'\n'}
                {'\n'}
              </Text>
              In accordance with the law you have the following rights in
              relation to your personal data used by Otoz.Ai :{'\n'}
              {'\n'}
              Right to erasure (“right to be forgotten”) Otoz.Ai will delete or
              anonymize your personal information when requested. The deletion
              of your personal data will be done as soon as possible within one
              month of receiving your request. Exceptions Otoz.Ai is only
              obligated to delete your data if Otoz.Ai is not obligated by law
              to keep the information and one of the following applies:
              {'\n'}
              {'\n'}
              {'     '}. The personal data are no longer necessary in relation
              to the purposes for which they were collected or otherwise
              processed;
              {'\n'}
              {'     '}. You withdraw the consent given for the collection and
              processing, and where there is no other legal ground for the
              processing;
              {'\n'}
              {'     '}. You object to the processing for direct marketing
              purposes;
              {'\n'}
              {'     '}. Your personal data have been unlawfully processed;
              {'\n'}
              {'     '}. Your personal data have to be erased for compliance
              with a legal obligation in law to which Otoz.Ai is subject;
              {'\n'}
              {'     '}. The personal data have been collected in relation to
              the offer of information society services.
              {'\n'}
              Right to restriction of processing
              {'\n'}
              {'\n'}
              Otoz.Ai will stop processing your personal data on your request.
              {'\n'}
              {'\n'}
              Exceptions Otoz.Ai is only obligated to stop processing your data
              if one of the following applies:
              {'\n'}
              {'\n'}
              The accuracy of the personal data is contested by you, for a
              period enabling Otoz.Ai to verify the accuracy of the personal
              data; The processing is unlawful and you oppose the erasure of the
              personal data and requests the restriction of their use instead;
              {'\n'}
              {'\n'}
              Otoz.Ai no longer needs the personal data for the purposes of the
              processing, but they are required by the data subject for the
              establishment, exercise or defense of legal claims; You have
              informed Otoz.Ai of infringement on your interests, rights and
              freedoms pending the verification whether the legitimate grounds
              of Otoz.Ai override yours.
              {'\n'}
              {'\n'}
              Right to rectification
              {'\n'}
              {'\n'}
              Right of access by the data subject
              {'\n'}
              {'\n'}
              Right to withdraw consent
              {'\n'}
              {'\n'}
              Where our collection and use of your personal data is based on
              your consent you can withdraw that consent at any time by
              contacting Otoz.Ai.
              {'\n'}
              {'\n'}
              RRight to data portability
              {'\n'}
              {'\n'}
              You are entitled to get a copy of your personal data in a machine
              readable format. Otoz.Ai can also send it directly to another
              company on your request.
              {'\n'}
              {'\n'}
              Exceptions Otoz.Ai is only obligated to provide your personal data
              where:
              {'\n'}
              {'\n'}
              {'     '}. The data is provided to Otoz.Ai by you,
              {'\n'}
              {'     '}. The data collection is based on your consent or a
              contract in which you are a party and
            </Text>
          }
          isOpen={openIndex === 9}
          onPress={() => handleAccordionToggle(9)}
        />
        <View style={{height: 50}} />
      </ScrollView>
    </View>
  );
};

export default React.memo(TermsnCondition);

const styles = StyleSheet.create({
  backIcon: {
    width: 25,
    height: 20,
  },
  container: {flex: 1, backgroundColor: Colors.ai_gray_900},
});

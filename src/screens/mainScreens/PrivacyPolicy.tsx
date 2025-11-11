import {Image, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import TopHeader from '../../components/TopHeader';
import { Colors } from '../../utilis/Colors';

const PrivacyPolicy = () => {
  const navigation = useNavigation();

  return (
    <View
      style={styles.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <TopHeader title="Privacy Policy" />
      <ScrollView
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
        {/* <Text style={styles.title}>Privacy Policy</Text> */}
        <Text style={styles.normalTxt}>
          Otoz.Ai recognizes the importance of social responsibility that it
          truthfully work to meet the needs of its customers and to contribute
          to the society. The Personal Information obtained from its customers
          in the course of business activities are an important asset of the
          customers and of Otoz.Ai as it leads to creation of new value. Otoz.Ai
          protects Personal Information from information security threats with
          the following Basic Policy and meets its customers expectations on its
          reliability As a company, Otoz.Ai is committed to the responsible
          handling of Personal Information.
        </Text>
        <Text style={[styles.title, {marginTop: 20, fontSize: 18}]}>
          Personal Information Protection Policy
        </Text>
        <Text style={styles.normalTxt}>
          1. Otoz.Ai observes the Act on the Protection of Personal Information,
          Act on the Use of Social Security and Tax Number System in the
          Administrative Procedure and other relevant laws, rules, and
          guidelines established by the government and other regulations. 2.
          Otoz.Ai has established a management framework to protect Personal
          Information, and assigned a person to “Personal Information Protection
          Administrator” position and implemented the appropriate protection of
          it. 3. Otoz.Ai utilizes Personal Information within the scope of the
          intended use that is clearly communicated to customers, and takes
          measures not to be used beyond the scope. Otoz.Ai does not disclose or
          provide Personal Information provided by customers to third parties
          except with the consent of the customer from whom the Personal
          Information was obtained or when there is a legitimate reason. 4.
          Otoz.Ai strives to prevent unauthorized access to Personal Information
          or the leakage, loss, or damage of Personal Information and
          continually enhances, re-mediates and manages information security. 5.
          Otoz.Ai responds to inquiries concerning Personal Information or
          requests from customers for disclosure of their Personal Information
          sincerely and without delay.
        </Text>
        <Text style={[styles.title, {marginTop: 20, fontSize: 18}]}>
          1. Personal Information
        </Text>
        <Text style={styles.normalTxt}>
          Personal Information means information concerning a User as an
          individual, which can identify the User based on the name, address,
          telephone number, e-mail address, educational institution, or other
          descriptions, etc. constituting such information. In addition, any
          information which cannot identify the User solely by itself but can
          easily be collated with other information and, as a result thereof,
          can identify the User, is also included in the scope of Personal
          Information. Personal Information is described in this Privacy Policy
          exclude Specific Personal Information, etc.
        </Text>
        <Text style={[styles.title, {marginTop: 20, fontSize: 18}]}>
          2. Purpose of Use of Personal Information
        </Text>
        <Text style={styles.normalTxt}>
          Otoz.Ai will use Personal Information within the scope of the purposes
          provided in the Purpose of Use. The Purpose of Use is specifically
          defined and made clear to our customers, and is announced on our
          website as shown below. Otoz.Ai will make an effort to limit the
          Purpose of Use according to the situation in which the information is
          obtained. 1. Achieving the Purpose of Use of our service and business.
          2. Notices of service, etc. to its customers. 3. Giving notice to
          shareholders, provision of various types of information and
          shareholder management 4. Exercise of rights or performance of
          obligations based on Act of Japan and other relevant laws and
          ordinances 5. Responding to inquiries, requests, etc. from its
          customers 6. Carrying out operations incidental to (1) through (5)
          above and operations to properly and smoothly manage the business of
          Otoz.Ai When handling Personal Information beyond the scope necessary
          for achieving the Purpose of Use, Otoz.Ai will seek customer’s consent
          except for cases prescribed under items in Paragraph 3 of Article 16
          of the Privacy Act.
        </Text>
        <Text style={[styles.title, {marginTop: 20, fontSize: 18}]}>
          3. Provision of Personal Data to Third Parties
        </Text>
        <Text style={styles.normalTxt}>
          Otoz.Ai will not provide Personal Information to a third party without
          the customer’s consent, unless where any of the following applies: 1.
          required under laws or ordinances 2. required to protect human life,
          body or asset (including that of legal entities) and difficult to
          obtain the approval by the customer him/herself 3. made to a consignee
          within the scope necessary for carrying out our business 4. to use
          Personal Information jointly with a group company or a business
          partner of Otoz.Ai within the scope of the intended use 5. to provide,
          in an unrecoverable format, Personal Information in a format that does
          not allow easy identification or recognition of the corresponding
          individual. When handling Personal Information beyond the scope
          necessary for achieving the Purpose of Use, Otoz.Ai will seek
          customer’s consent except for cases prescribed under items in
          Paragraph 3 of Article 16 of the Privacy Act.
        </Text>
        <Text style={[styles.title, {marginTop: 20, fontSize: 18}]}>
          4. Disclaimer concerning the provision of Personal Information to
          third parties
        </Text>
        <Text style={styles.normalTxt}>
          Otoz.Ai will not be responsible for the acquisition of Personal
          Information by a third party where any of the following applies 1. A
          User indicates his/her own Personal Information to a specific company,
          using any function under the Services or by other means (As for the
          handling of Personal Information in the Service Using Companies, etc.,
          please directly make inquiries to each of the Service Using Companies,
          etc. ) 2. A User is unexpectedly identified by information entered by
          the User under the Services 3. A User provides Personal Information
          to, and the Users Personal Information is used at, an external site
          linked by the Services 4. Anyone other than a User obtains the Users
          information (ID, password, etc.) which can identify the User as an
          individual. 5. Additionally to above, Personal Information is leaked
          by computer viruses or similar causes.
        </Text>
        <Text style={[styles.title, {marginTop: 20, fontSize: 18}]}>
          5. Supervision of contractors
        </Text>
        <Text style={styles.normalTxt}>
          Otoz.Ai may consign all or part of our customer’s Personal Information
          handling operation. In such a case, Otoz.Ai elects a contractor who is
          expected to properly handle Personal Information, appropriately
          specify matters concerning handling of Personal Information such as
          Security Management Measures, confidentiality, terms and conditions of
          reconsignment, return of Personal Information upon expiration or
          termination of contract agreement, and performs necessary and
          appropriate supervision.
        </Text>
        <Text style={[styles.title, {marginTop: 20, fontSize: 18}]}>
          6. Handling of Sensitive Information
        </Text>
        <Text style={styles.normalTxt}>
          Otoz.Ai will not collect, use, or provide to a third party Sensitive
          Information, including but not limited to information regarding your
          healthcare or case history, except for cases provided by the Privacy
          Act, other relevant laws, ordinances and guidelines.
        </Text>
        <Text style={[styles.title, {marginTop: 20, fontSize: 18}]}>
          7. Handling of Specific Personal Information, etc.
        </Text>
        <Text style={styles.normalTxt}>
          The Purpose of Use of Specific Personal Information, etc. is limited
          under the “My Number” Act, and Otoz.Ai will not collect or use
          Specific Personal Information, etc. beyond the prescribed Purpose of
          Use. We will not provide Specific Personal Information, etc. to a
          third party except in cases permitted under the “My Number” Act.
        </Text>
        <Text style={[styles.title, {marginTop: 20, fontSize: 18}]}>
          8. Notice of Matters, Disclosure, Amendment, or Suspension of Use of
          Personal Information and Specific Personal Information, etc.
        </Text>
        <Text style={styles.normalTxt}>
          Customer requests for any notice of matters, disclosure, amendment, or
          suspension of use of Personal Information and Specific Personal
          Information, etc. held by Otoz.Ai under the Privacy Act shall be
          directed to the Contact Office indicated in Clause 11 below. After
          confirming the customer as the requesting party, the customer is
          requested to complete a form designated by us. Otoz.Ai will then
          follow the procedures and, in principle, provide a written response in
          a proper, timely manner. Otoz.Ai will charge the prescribed fees for
          responding to a request for any disclosure.
        </Text>
        <Text style={[styles.title, {marginTop: 20, fontSize: 18}]}>
          9. Use of Cookies, etc.
        </Text>
        <Text style={styles.normalTxt}>
          Otoz.Ai uses cookies, etc. to provide better services on its websites.
        </Text>
        <Text style={[styles.title, {marginTop: 20, fontSize: 18}]}>
          10. Management of Personal Data and Specific Personal Information,
          etc.
        </Text>
        <Text style={styles.normalTxt}>
          Otoz.Ai will take a rational security measures to manage Personal
          Information and Specific Personal Information, etc. securely and to
          prevent divulgence, loss or damage to Personal Information and
          Specific Personal Information, etc. handled by Otoz.Ai, and will
          ensure the accuracy and prompt updating of Personal Information and
          Specific Personal Information, etc. which are necessary to achieve the
          Purpose of Use.
        </Text>
        <View style={{height: 50}} />
      </ScrollView>
    </View>
  );
};

export default React.memo(PrivacyPolicy);

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor:Colors.ai_gray_900},
  title: {
    fontSize: 20,
    color: Colors.ai_gray_900,
    fontWeight: 'bold',
    textAlign: 'justify',
  },
  normalTxt: {
    fontSize: 14,
    color: Colors.ai_gray_150,
    fontWeight: '400',
    textAlign: 'justify',
    marginTop: 10,
  },
});

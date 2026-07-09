# Requirements Traceability Matrix (RTM)
## Web-Based Automated Car Service Advisor (Perodua Specialist)

This matrix establishes a direct cross-reference mapping between your project's **Software Requirements Specification (SRS)** IDs and the **Software Design Document (SDD)** design elements (Packages and Classes) as defined in the template from [SDD - sample 1.pdf](file:///c:/Users/ASUS/Documents/UiTM%20%28DEGREE%29/SEM%205/FYP/Web-Based%20Automated%20Car%20Service%20Advisor/SDD%20-%20sample%201.pdf).

---

## 1. Class and Package Legend
To ensure the matrix fits within clear visual boundaries, the columns are abbreviated using class codes (`C101` to `C310`). This legend details their mapping to the actual SDD classes and package categories:

### SDD_PKG_100: Boundary / Presentation Layer (User Interface)
*   **C101**: `SDD_CLASS_101` - `SignUpPage` (`signup.html`)
*   **C102**: `SDD_CLASS_102` - `SignInPage` (`signin.html`)
*   **C103**: `SDD_CLASS_103` - `DashboardView` (`index.html` & `profile.html` / `js/quotes-logic.js`)
*   **C104**: `SDD_CLASS_104` - `QuotesView` (`quotes.html`)
*   **C105**: `SDD_CLASS_105` - `PartsManagementView` (`parts.html`)
*   **C106**: `SDD_CLASS_106` - `UsersManagementView` (`users.html`)
*   **C107**: `SDD_CLASS_107` - `KnowledgeHubView` (`knowledge.html`)
*   **C108**: `SDD_CLASS_108` - `LocatorView` (`locate.html`)

### SDD_PKG_200: Domain / Controller Layer (Business Logic)
*   **C201**: `SDD_CLASS_201` - `UserController`
*   **C202**: `SDD_CLASS_202` - `EmployeeController`
*   **C203**: `SDD_CLASS_203` - `CustomerController`
*   **C204**: `SDD_CLASS_204` - `QuoteController`
*   **C205**: `SDD_CLASS_205` - `CarController`
*   **C206**: `SDD_CLASS_206` - `PartController`
*   **C207**: `SDD_CLASS_207` - `KnowledgeController`
*   **C208**: `SDD_CLASS_208` - `LocateController`
*   **C209**: `SDD_CLASS_209` - `HomeController`

### SDD_PKG_300: Entity / Data Layer (Database Models)
*   **C301**: `SDD_CLASS_210` - `User`
*   **C302**: `SDD_CLASS_211` - `Customer`
*   **C303**: `SDD_CLASS_212` - `Employee`
*   **C304**: `SDD_CLASS_213` - `CarModel`
*   **C305**: `SDD_CLASS_214` - `CarVariant`
*   **C306**: `SDD_CLASS_215` - `ServiceCategory`
*   **C307**: `SDD_CLASS_216` - `Quotation`
*   **C308**: `SDD_CLASS_217` - `QuotationPart`
*   **C309**: `SDD_CLASS_218` - `ServicePart`
*   **C310**: `SDD_CLASS_219` - `KnowledgeCategory`

---

## 2. Traceability Requirements Matrix Grid

<div style="overflow-x: auto; margin-top: 1.5rem; margin-bottom: 1.5rem;">
<table style="border-collapse: collapse; width: 100%; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 11px; text-align: center; min-width: 900px; border: 1px solid #ccc; line-height: 1.4;">
  <thead>
    <!-- Package Header Row -->
    <tr style="background-color: #333333; color: #ffffff; font-weight: bold; border-bottom: 2px solid #111;">
      <th rowspan="3" colspan="2" style="border: 1px solid #444; padding: 12px; font-size: 12px; background-color: #222; text-align: center; vertical-align: middle; color: #fff;">SRS Requirement / SDD Design</th>
      <th colspan="27" style="border: 1px solid #444; padding: 8px; font-size: 12px; letter-spacing: 0.1em; background-color: #222;">PACKAGE</th>
    </tr>
    <!-- Sub-Package Header Row -->
    <tr style="background-color: #f2f2f2; color: #333; font-weight: bold; border-bottom: 1px solid #ccc;">
      <th colspan="8" style="border: 1px solid #ccc; padding: 8px; background-color: #e9ecef;">SDD_PKG_100 (Boundary / Views)</th>
      <th colspan="9" style="border: 1px solid #ccc; padding: 8px; background-color: #e9ecef;">SDD_PKG_200 (Controllers)</th>
      <th colspan="10" style="border: 1px solid #ccc; padding: 8px; background-color: #e9ecef;">SDD_PKG_300 (Entity Models)</th>
    </tr>
    <!-- Class Header Row -->
    <tr style="background-color: #f8f9fa; font-weight: bold; border-bottom: 2px solid #ccc; color: #555;">
      <!-- SDD_PKG_100 classes -->
      <th style="border: 1px solid #ccc; padding: 6px;" title="SignUpPage (signup.html)">C101</th>
      <th style="border: 1px solid #ccc; padding: 6px;" title="SignInPage (signin.html)">C102</th>
      <th style="border: 1px solid #ccc; padding: 6px;" title="DashboardView (index.html)">C103</th>
      <th style="border: 1px solid #ccc; padding: 6px;" title="QuotesView (quotes.html)">C104</th>
      <th style="border: 1px solid #ccc; padding: 6px;" title="PartsManagementView (parts.html)">C105</th>
      <th style="border: 1px solid #ccc; padding: 6px;" title="UsersManagementView (users.html)">C106</th>
      <th style="border: 1px solid #ccc; padding: 6px;" title="KnowledgeHubView (knowledge.html)">C107</th>
      <th style="border: 1px solid #ccc; padding: 6px;" title="LocatorView (locate.html)">C108</th>
      <!-- SDD_PKG_200 controllers -->
      <th style="border: 1px solid #ccc; padding: 6px;" title="UserController">C201</th>
      <th style="border: 1px solid #ccc; padding: 6px;" title="EmployeeController">C202</th>
      <th style="border: 1px solid #ccc; padding: 6px;" title="CustomerController">C203</th>
      <th style="border: 1px solid #ccc; padding: 6px;" title="QuoteController">C204</th>
      <th style="border: 1px solid #ccc; padding: 6px;" title="CarController">C205</th>
      <th style="border: 1px solid #ccc; padding: 6px;" title="PartController">C206</th>
      <th style="border: 1px solid #ccc; padding: 6px;" title="KnowledgeController">C207</th>
      <th style="border: 1px solid #ccc; padding: 6px;" title="LocateController">C208</th>
      <th style="border: 1px solid #ccc; padding: 6px;" title="HomeController">C209</th>
      <!-- SDD_PKG_300 entities -->
      <th style="border: 1px solid #ccc; padding: 6px;" title="User">C301</th>
      <th style="border: 1px solid #ccc; padding: 6px;" title="Customer">C302</th>
      <th style="border: 1px solid #ccc; padding: 6px;" title="Employee">C303</th>
      <th style="border: 1px solid #ccc; padding: 6px;" title="CarModel">C304</th>
      <th style="border: 1px solid #ccc; padding: 6px;" title="CarVariant">C305</th>
      <th style="border: 1px solid #ccc; padding: 6px;" title="ServiceCategory">C306</th>
      <th style="border: 1px solid #ccc; padding: 6px;" title="Quotation">C307</th>
      <th style="border: 1px solid #ccc; padding: 6px;" title="QuotationPart">C308</th>
      <th style="border: 1px solid #ccc; padding: 6px;" title="ServicePart">C309</th>
      <th style="border: 1px solid #ccc; padding: 6px;" title="KnowledgeCategory">C310</th>
    </tr>
  </thead>
  <tbody>
    <!-- ==================== SRS REQ 100 ==================== -->
    <tr>
      <td rowspan="4" style="border: 1px solid #ccc; padding: 8px; font-weight: bold; background-color: #f1f3f5; color: #495057; text-align: center; vertical-align: middle; width: 120px;">
        SRS REQ 100<br><span style="font-weight: normal; font-size: 10px; color: #6c757d;">User Account & Access</span>
      </td>
      <td style="border: 1px solid #ccc; padding: 6px; text-align: left; background-color: #ffffff; font-weight: 500; width: 220px;"><strong>SRS_REQ_101</strong>: Customer Registration</td>
      <!-- C101 - C108 -->
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <!-- C201 - C209 -->
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <!-- C301 - C310 -->
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 6px; text-align: left; background-color: #ffffff; font-weight: 500;"><strong>SRS_REQ_102</strong>: Account Authentication</td>
      <!-- C101 - C108 -->
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <!-- C201 - C209 -->
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <!-- C301 - C310 -->
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 6px; text-align: left; background-color: #ffffff; font-weight: 500;"><strong>SRS_REQ_103</strong>: View User Profile</td>
      <!-- C101 - C108 -->
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <!-- C201 - C209 -->
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <!-- C301 - C310 -->
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 6px; text-align: left; background-color: #ffffff; font-weight: 500;"><strong>SRS_REQ_104</strong>: Modify User Profile</td>
      <!-- C101 - C108 -->
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <!-- C201 - C209 -->
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <!-- C301 - C310 -->
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
    </tr>

    <!-- ==================== SRS REQ 200 ==================== -->
    <tr>
      <td rowspan="2" style="border: 1px solid #ccc; padding: 8px; font-weight: bold; background-color: #f1f3f5; color: #495057; text-align: center; vertical-align: middle;">
        SRS REQ 200<br><span style="font-weight: normal; font-size: 10px; color: #6c757d;">Car Config Catalog</span>
      </td>
      <td style="border: 1px solid #ccc; padding: 6px; text-align: left; background-color: #ffffff; font-weight: 500;"><strong>SRS_REQ_201</strong>: Retrieve Car Model List</td>
      <!-- C101 - C108 -->
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <!-- C201 - C209 -->
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <!-- C301 - C310 -->
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 6px; text-align: left; background-color: #ffffff; font-weight: 500;"><strong>SRS_REQ_202</strong>: Filter Models & Variants</td>
      <!-- C101 - C108 -->
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <!-- C201 - C209 -->
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <!-- C301 - C310 -->
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
    </tr>

    <!-- ==================== SRS REQ 300 ==================== -->
    <tr>
      <td rowspan="6" style="border: 1px solid #ccc; padding: 8px; font-weight: bold; background-color: #f1f3f5; color: #495057; text-align: center; vertical-align: middle;">
        SRS REQ 300<br><span style="font-weight: normal; font-size: 10px; color: #6c757d;">Estimates & Calculations</span>
      </td>
      <td style="border: 1px solid #ccc; padding: 6px; text-align: left; background-color: #ffffff; font-weight: 500;"><strong>SRS_REQ_301</strong>: Mileage Milestone Lookup</td>
      <!-- C101 - C108 -->
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <!-- C201 - C209 -->
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <!-- C301 - C310 -->
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 6px; text-align: left; background-color: #ffffff; font-weight: 500;"><strong>SRS_REQ_302</strong>: Checklist Component Listing</td>
      <!-- C101 - C108 -->
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <!-- C201 - C209 -->
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <!-- C301 - C310 -->
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 6px; text-align: left; background-color: #ffffff; font-weight: 500;"><strong>SRS_REQ_303</strong>: Real-time Recalculation</td>
      <!-- C101 - C108 -->
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <!-- C201 - C209 -->
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <!-- C301 - C310 -->
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 6px; text-align: left; background-color: #ffffff; font-weight: 500;"><strong>SRS_REQ_304</strong>: Save Quotation Details</td>
      <!-- C101 - C108 -->
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <!-- C201 - C209 -->
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <!-- C301 - C310 -->
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 6px; text-align: left; background-color: #ffffff; font-weight: 500;"><strong>SRS_REQ_305</strong>: View Quotation History</td>
      <!-- C101 - C108 -->
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <!-- C201 - C209 -->
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <!-- C301 - C310 -->
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 6px; text-align: left; background-color: #ffffff; font-weight: 500;"><strong>SRS_REQ_306</strong>: Delete Quotation Estimate</td>
      <!-- C101 - C108 -->
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <!-- C201 - C209 -->
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <!-- C301 - C310 -->
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
    </tr>

    <!-- ==================== SRS REQ 400 ==================== -->
    <tr>
      <td rowspan="5" style="border: 1px solid #ccc; padding: 8px; font-weight: bold; background-color: #f1f3f5; color: #495057; text-align: center; vertical-align: middle;">
        SRS REQ 400<br><span style="font-weight: normal; font-size: 10px; color: #6c757d;">Admin Dashboard Controls</span>
      </td>
      <td style="border: 1px solid #ccc; padding: 6px; text-align: left; background-color: #ffffff; font-weight: 500;"><strong>SRS_REQ_401</strong>: Inventory Parts CRUD</td>
      <!-- C101 - C108 -->
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <!-- C201 - C209 -->
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <!-- C301 - C310 -->
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 6px; text-align: left; background-color: #ffffff; font-weight: 500;"><strong>SRS_REQ_402</strong>: Users Auditing Database</td>
      <!-- C101 - C108 -->
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <!-- C201 - C209 -->
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <!-- C301 - C310 -->
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 6px; text-align: left; background-color: #ffffff; font-weight: 500;"><strong>SRS_REQ_403</strong>: Service Locator Filters</td>
      <!-- C101 - C108 -->
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <!-- C201 - C209 -->
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <!-- C301 - C310 -->
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 6px; text-align: left; background-color: #ffffff; font-weight: 500;"><strong>SRS_REQ_404</strong>: Knowledge Hub Articles</td>
      <!-- C101 - C108 -->
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <!-- C201 - C209 -->
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <!-- C301 - C310 -->
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 6px; text-align: left; background-color: #ffffff; font-weight: 500;"><strong>SRS_REQ_405</strong>: Gemini AI Chatbot widget</td>
      <!-- C101 - C108 -->
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <!-- C201 - C209 -->
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #e31837; color: #ffffff; font-weight: bold; padding: 4px;">X</td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <!-- C301 - C310 -->
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
      <td style="border: 1px solid #ccc; background-color: #ffffff;"></td>
    </tr>
  </tbody>
</table>
</div>

---

## 3. Intersection Logic & Traceability Analysis

*   **Registration (`SRS_REQ_101` -> `C101`, `C201`, `C203`, `C301`, `C302`)**:
    *   The `signup.html` view captures customer credentials.
    *   Submits inputs to `UserController.createUser()` and `CustomerController.registerCustomer()`.
    *   Creates persistent instances of `User` and `Customer` entity records in the database.
*   **Car Specifications (`SRS_REQ_201`, `SRS_REQ_202` -> `C103`, `C205`, `C304`, `C305`)**:
    *   Car model/variant selections dropdown cascading is loaded on `index.html`.
    *   Handled logic-side by `CarController.listModels()`.
    *   Fetches dynamic rows from `CarModel` and `CarVariant` entities.
*   **Checklist & Cost Calculation (`SRS_REQ_301` to `SRS_REQ_304` -> `C103`, `C204`, `C307`, `C308`, `C309`)**:
    *   Odometer input and interactive checklist updates are presented on `index.html` dynamically.
    *   The calculations are orchestrated by `QuoteController.createQuote()`.
    *   The database writes data relations to `Quotation`, `QuotationPart` mapping table, and references `ServicePart` parameters.
*   **Gemini AI Chatbot (`SRS_REQ_405` -> `C103`, `C204`)**:
    *   The conversational widget floating panel is rendered on `index.html` (and other views).
    *   Uses system variables to prompt advisory chatbot logic, matching vehicle service details (`QuoteController`).

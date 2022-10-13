Feature: Customer search feature

  @ecommerce
  Scenario Outline: <TestID>: Search external customers
    Given Get a list of users from reqres.in
    When as an admin user login to nopcommerce site
    Then Verify if all users exist in customer list

    Examples:
      | TestID          |
      | ECOMMERCE_TC001 | 
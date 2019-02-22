Feature: Home page

  @focus
  Scenario Outline: Navigating Home Links
    Given I go to the home page
    When I click on "<element>"
    Then I am navigated to "<location>" page

    Examples:
      | element           | location     |
      | #home-about-me    | about-me     |
      | #home-blog        | blog         |
      | #home-coding-kata | coding-katas |
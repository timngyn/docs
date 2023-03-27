module.exports = {
  commentListOfReviewers: () => {},
  verifyApproval: async ({ github, context }) => {
    console.log(context);

    const {
      payload: {
        pull_request: { number },
        repository: {
          owner: { login: ownerLogin },
          name
        },
        review: {
          state,
          user: { login }
        }
      }
    } = context;

    console.log(state);
    console.log(login);
    console.log(number);
    console.log(ownerLogin);

    const reviewers = await github.rest.pulls.listRequestedReviewers({
      owner: ownerLogin,
      repo: name,
      pull_number: number
    });

    const {
      data: { users, teams }
    } = reviewers;
    // need to also check that all the reviewers actually approved

    const reviews = await github.rest.pulls.listReviews({
      owner: ownerLogin,
      repo: name,
      pull_number: number
    });

    console.log(reviews.data);
  }
};

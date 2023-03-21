module.exports = async ({ github, context, ignore }) => {
  const { NEW_FILES } = process.env;

  const response = await fetch(
    'https://raw.githubusercontent.com/timngyn/docs/test-codeowners-workflow/.github/CODEOWNERS'
  );
  const body = await response.text();

  const codeownersFilePatterns = body
    .split('\n')
    .filter((e) => !e.startsWith('#'))
    .filter((e) => !e.includes('aws-amplify/documentation-team'))
    .filter((e) => e.length > 1)
    .map((e) => e.split(/\s+/)[0]);

  console.log(codeownersFilePatterns);

  const ig = ignore().add(codeownersFilePatterns);
  const filesNotInCodeowners = [];

  JSON.parse(NEW_FILES).forEach((newFile) => {
    if (!ig.ignores(newFile.filename)) {
      console.log(`${newFile.filename} is not covered by CODEOWNERS`);
      filesNotInCodeowners.push(newFile.filename);
    }
  });

  const {
    issue: { number: issue_number },
    repo: { owner, repo }
  } = context;
  if (filesNotInCodeowners.length > 0) {
    const needCodeownersUpdateComment = `CODEOWNERS need to be updated because these new files are not covered:\n
              ${filesNotInCodeowners.map((e) => `- ${e}\n`).join('')}
             `;
    github.rest.issues.createComment({
      owner,
      repo,
      issue_number,
      body: needCodeownersUpdateComment
    });
    const labels = ['update-codeowners'];
    github.rest.issues.addLabels({ owner, repo, issue_number, labels });
  }
};

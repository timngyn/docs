import sdk from '@stackblitz/sdk';
import { useEffect } from 'react';

export default function StackBlitzEmbed({ vmId, github, openFile }) {
  useEffect(() => {
    sdk.embedGithubProject(vmId, github, {
      openFile: openFile,
      hideExplorer: true,
      hideNavigation: true,
      showSidebar: false,
      view: 'editor',
      terminalHeight: 0,
      clickToLoad: true
    });
  }, []);

  return <div id={vmId}></div>;
}

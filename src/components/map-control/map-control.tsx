// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import { useState } from "react";
import classnames from "classnames";
import styled from "styled-components";
import Markdown from "markdown-to-jsx";
// import { useLocalStorage } from "usehooks-ts";
import { Icons, IconRoundSmall, MapControlButton } from "@kepler.gl/components";
// import { getApplicationConfig } from "@kepler.gl/utils";

const StyledFloatingPanel = styled.div`
  margin-right: 12px;
  margin-top: 12px;
`;

const StyledProjectPanel = styled.div`
  background: ${(props) => props.theme.panelBackground};
  padding: 16px 16px 16px 20px;
  width: 280px;
  box-shadow: ${(props) => props.theme.panelBoxShadow};

  .project-title {
    color: ${(props) => props.theme.titleTextColor};
    font-size: 13px;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
  }

  .project-description {
    color: ${(props) => props.theme.textColor};
    font-size: 11px;
    margin-top: 12px;

    a {
      font-weight: 500;
      color: ${(props) => props.theme.titleTextColor};
    }
  }

  .project-links {
    margin-top: 16px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;
const StyledPanelAction = styled.div`
  border-radius: 2px;
  margin-left: 4px;
  padding: 5px;
  font-weight: 500;

  a {
    align-items: center;
    justify-content: flex-start;
    display: flex;
    height: 16px;
    padding-right: 10px;
    color: ${(props) => props.theme.subtextColor};

    svg {
      margin-right: 8px;
    }
  }

  &:hover {
    cursor: pointer;
    a {
      color: ${(props) => props.theme.textColorHl};
    }
  }
`;

interface LinkButtonProps {
  label: string;
  href?: string;
  iconComponent: React.JSXElementConstructor<{ height?: string }>;
  height?: string;
}

export const LinkButton = ({
  label,
  href = "#",
  iconComponent: IconComponent,
  height,
}: LinkButtonProps) => (
  <StyledPanelAction className="project-link__action">
    <a target="_blank" rel="noopener noreferrer" href={href}>
      <IconComponent height={height || "16px"} />
      <p>{label}</p>
    </a>
  </StyledPanelAction>
);

interface CloseButtonProps {
  onClick: () => void;
}

const CloseButton = ({ onClick }: CloseButtonProps) => (
  <IconRoundSmall>
    <Icons.Close height="16px" onClick={onClick} />
  </IconRoundSmall>
);

// convert https://raw.githubusercontent.com/keplergl/kepler.gl-data/master/nyctrips/config.json
// to https://github.com/keplergl/kepler.gl-data/blob/master/movement_pittsburgh/config.json
function getURL(url: string | undefined): string {
  if (!url) return "#";
  return url
    .replace("https://raw.githubusercontent.com", "https://github.com")
    .replace("master", "blob/master");
}

interface SampleData {
  label: string;
  detail?: string;
  description?: string;
  dataUrl?: string;
  configUrl?: string;
}

interface MapPanelProps {
  currentSample?: SampleData;
  isExport?: boolean;
  theme: {
    rightPanelMarginTop: number;
    rightPanelMarginRight: number;
    bottomWidgetPaddingBottom: number;
  };
}

interface MarkdownLinkProps {
  children: React.ReactNode;
  target?: string;
  rel?: string;
  href?: string;
}

export function BannerMapPanel() {
  const [isActive, setActive] = useState(true);
  // Once the banner is closed, the user won't see the banner during next sessions.
  const [showBanner, setShowBanner] = useState(true);
  const [wasVisible] = useState(showBanner);

  if (!showBanner && !wasVisible) {
    return null;
  }

  return (
    <StyledFloatingPanel>
      {isActive ? (
        <StyledProjectPanel>
          <div className="project-title">
            <div>{"Kepler.gl 3.1 + DuckDB is here!"}</div>

            <CloseButton
              onClick={() => {
                setShowBanner(false);
                setActive(false);
              }}
            />
          </div>
          <div className="project-description">
            <Markdown
              options={{
                overrides: {
                  a: {
                    component: (props: MarkdownLinkProps) => (
                      <a {...props} target="_blank" rel="noopener noreferrer">
                        {props.children}
                      </a>
                    ),
                  },
                },
              }}
            >
              {
                "[Click here](https://kepler-preview.foursquare.com) to check out the preview of Kepler.gl 3.1 with DuckDB enabled!"
              }
            </Markdown>
          </div>
        </StyledProjectPanel>
      ) : (
        <MapControlButton
          className={classnames("map-control-button", "info-panel", {
            isActive,
          })}
          onClick={(e) => {
            e.preventDefault();
            setActive(true);
          }}
        >
          <Icons.Docs height="18px" />
        </MapControlButton>
      )}
    </StyledFloatingPanel>
  );
}

export function SampleMapPanel({ currentSample }: MapPanelProps) {
  const [isActive, setActive] = useState(true);
  const FilesIcon = (props: { height?: string }) => <Icons.Files {...props} />;
  const CodeAltIcon = (props: { height?: string }) => (
    <Icons.CodeAlt {...props} />
  );

  return (
    <StyledFloatingPanel>
      {isActive ? (
        <StyledProjectPanel>
          <div className="project-title">
            <div>{currentSample?.label}</div>
            <CloseButton onClick={() => setActive(false)} />
          </div>
          <div className="project-description">
            {(currentSample?.detail || currentSample?.description) && (
              <Markdown
                options={{
                  overrides: {
                    a: {
                      component: (props: MarkdownLinkProps) => (
                        <a {...props} target="_blank" rel="noopener noreferrer">
                          {props.children}
                        </a>
                      ),
                    },
                  },
                }}
              >
                {currentSample?.detail || currentSample?.description || ""}
              </Markdown>
            )}
          </div>
          <div className="project-links">
            <LinkButton
              label="Data"
              href={getURL(currentSample?.dataUrl)}
              iconComponent={FilesIcon}
              height="15px"
            />
            <LinkButton
              label="Config"
              href={getURL(currentSample?.configUrl)}
              iconComponent={CodeAltIcon}
              height="17px"
            />
          </div>
        </StyledProjectPanel>
      ) : (
        <MapControlButton
          className={classnames("map-control-button", "info-panel", {
            isActive,
          })}
          onClick={(e) => {
            e.preventDefault();
            setActive(true);
          }}
        >
          <Icons.Docs height="18px" />
        </MapControlButton>
      )}
    </StyledFloatingPanel>
  );
}

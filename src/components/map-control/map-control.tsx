// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import { useState } from "react";
import classnames from "classnames";
import styled from "styled-components";
import Markdown from "markdown-to-jsx";
import { useSelector } from "react-redux";
import { Icons, IconRoundSmall, MapControlButton } from "@reedu-kepler.gl/components";

const StyledFloatingPanel = styled.div`
  margin-right: 12px;
  margin-top: 12px;
`;

const StyledProjectPanel = styled.div`
  background: #ffffff; // White background
  padding: 16px 16px 16px 20px;
  width: 280px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  border: 1px solid #e2e8f0; // Light border for better definition

  .project-title {
    color: #1e293b; // Dark text for contrast
    font-size: 13px;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
  }
  .project-description {
    color: #475569; // Slate gray for better readability
    font-size: 11px;
    margin-top: 12px;

    a {
      font-weight: 500;
      color: #3b82f6; // Blue for links
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
    ${ /* @ts-expect-error does not exist */'' }
    color: ${(props) => props.theme.subtextColor};

    svg {
      margin-right: 8px;
    }
  }

  &:hover {
    cursor: pointer;
    a {
      ${ /* @ts-expect-error does not exist */'' }
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
  const [isActive, setActive] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [wasVisible] = useState(showBanner);
  interface RootState {
    activeDataset: {
      info: {
        title?: string;
        description?: string;
        [key: string]: unknown;
        url?: string;
        configUrl?: string;
      };
    };
  }
  const activeDataset = useSelector(
    (state: RootState) => state.activeDataset.info,
  );

  if (!showBanner && !wasVisible) {
    return null;
  }

  return (
    <StyledFloatingPanel>
      {isActive ? (
        <StyledProjectPanel>
          {" "}
          <div className="project-title">
            <div>{activeDataset?.title || "Select a dataset"}</div>
            <CloseButton
              onClick={() => {
                setShowBanner(false);
                setActive(false);
              }}
            />
          </div>
          <div className="project-description">
            {" "}
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
              {activeDataset?.description || "No dataset selected"}
            </Markdown>
          </div>
          <div className="project-links">
            <LinkButton
              label="Data"
              href={activeDataset?.url}
              iconComponent={(props) => <Icons.Files {...props} />}
              height="15px"
            />
            <LinkButton
              label="Config"
              href={activeDataset?.configUrl}
              iconComponent={(props) => <Icons.CodeAlt {...props} />}
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
              href={currentSample?.dataUrl}
              iconComponent={FilesIcon}
              height="15px"
            />
            <LinkButton
              label="Config"
              href={currentSample?.configUrl}
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

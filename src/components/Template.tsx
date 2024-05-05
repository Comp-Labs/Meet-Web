// Other Imports
import * as React from "react";
import customTheme from "../theme";
import GoogleIcon from "./GoogleIcon";
// MUI Joy (Other)
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import ColorSchemeToggle from "./ColorSchemeToggle";
// MUI Joy (Components)
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import FormControl from "@mui/joy/FormControl";
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel";
import IconButton, { IconButtonProps } from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Tooltip from "@mui/joy/Tooltip";
import Divider from "@mui/joy/Divider";
import Link from "@mui/joy/Link";
// Icons
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";

export default function Template({ children }: { children: React.ReactNode }) {
    function time(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? "0" + minutes : minutes;
        var strTime = hours + ":" + minutes + " " + ampm;
        return strTime;
    }
    var today = new Date();
    var day = today.toLocaleString("default", { weekday: "short" });
    var month = today.toLocaleString("default", { month: "short" });
    var date = today.toLocaleString("default", { day: "2-digit" });
    return (
        <CssVarsProvider>
            <CssBaseline />
            <GlobalStyles
                styles={{
                    ":root": {
                        "--Collapsed-breakpoint": "769px", // form will stretch when viewport is below `769px`
                        "--Cover-width": "40vw", // must be `vw` only
                        "--Form-maxWidth": "700px",
                        "--Transition-duration": "0.4s" // set to `none` to disable transition
                    }
                }}
            />
            <Box
                sx={(theme) => ({
                    width:
                        "clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)",
                    transition: "width var(--Transition-duration)",
                    transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    justifyContent: "flex-end",
                    backdropFilter: "blur(4px)",
                    backgroundColor: "rgba(255 255 255 / 0.6)",
                    [theme.getColorSchemeSelector("dark")]: {
                        backgroundColor: "rgba(19 19 24 / 0.4)"
                    }
                })}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        minHeight: "100dvh",
                        width:
                            "clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)",
                        maxWidth: "100%",
                        px: 2
                    }}
                >
                    <Box
                        component="header"
                        sx={{
                            py: 3,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-evenly"
                        }}
                    >
                        <Typography
                            fontWeight="lg"
                            startDecorator={
                                <Box
                                    component="span"
                                    sx={{
                                        width: 24,
                                        height: 24,
                                        background: (theme) =>
                                            `linear-gradient(45deg, ${theme.vars.palette.primary.solidBg}, ${theme.vars.palette.primary.solidBg} 30%, ${theme.vars.palette.primary.softBg})`,
                                        borderRadius: "50%",
                                        boxShadow: (theme) => theme.shadow.md,
                                        "--joy-shadowChannel": (theme) =>
                                            theme.vars.palette.primary.mainChannel
                                    }}
                                />
                            }
                        >
                            Tech Fiddle Meet
                        </Typography>
                        {/* <Typography fontWeight="lg">
                            {time(today)} • {day}, {month} {date}
                        </Typography> */}
                        <div>
                            <Tooltip
                                title="Help/Issues/Suggestions"
                                color="neutral"
                                size="md"
                                variant="solid"
                            >
                                <IconButton
                                    id="toggle-mode"
                                    size="sm"
                                    variant="plain"
                                    color="neutral"
                                    component="a"
                                    href="https://complabs.in/contact"
                                >
                                    <HelpOutlineRoundedIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip
                                title="Change Theme"
                                color="neutral"
                                size="md"
                                variant="solid"
                            >
                                <ColorSchemeToggle />
                            </Tooltip>
                        </div>
                    </Box>
                    {children}
                    <Box component="footer" sx={{ py: 3 }}>
                        <Typography level="body3" textAlign="center">
                            Copyright © {today.getFullYear()} Tech Fiddle. All Rights
                            Reserved.
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={(theme) => ({
                    height: "100%",
                    position: "fixed",
                    right: 0,
                    top: 0,
                    bottom: 0,
                    left:
                        "clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))",
                    transition:
                        "background-image var(--Transition-duration), left var(--Transition-duration) !important",
                    transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
                    backgroundColor: "background.level1",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundImage:
                        "url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8)",
                    [theme.getColorSchemeSelector("dark")]: {
                        backgroundImage:
                            "url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831)"
                    }
                })}
            />
        </CssVarsProvider>
    );
}

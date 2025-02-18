"use client";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Bell, Code, Copy, Check, Settings } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useSoljarUser } from "@/web3/hooks/use-soljar-user";
import { useState } from "react";
import { ButtonLogo } from "@/components/ui/button-logo";
export default function MorePage() {
  const { getUser } = useSoljarUser();
  const { data: user, isLoading } = getUser;
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (isLoading || !user) {
    return <div>Loading...</div>;
  }

  const buttonExamples = [
    {
      title: "Purple Button",
      code: `<a href="https://soljar.xyz/${user.username}" target="_blank" style="text-decoration: none;">
  <button style="padding: 12px 24px; border-radius: 8px; border: none; cursor: pointer; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; font-weight: 500; display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s ease; background-color: #7C3AED; color: white; box-shadow: 0 2px 4px rgba(124, 58, 237, 0.1); hover: { transform: translateY(-1px); background-color: #6D28D9; box-shadow: 0 4px 8px rgba(124, 58, 237, 0.2); }">
  <svg
      width="17"
      height="20"
      viewBox="0 0 172 206"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.00058148 170.933C0.00058148 167.62 2.68687 164.933 6.00058 164.933H40.6692C45.7199 164.933 48.5107 159.074 45.328 155.152L1.34123 100.954C0.473539 99.8847 -2.42299e-05 98.5497 9.31323e-10 97.1727L0.000475895 70.1298C0.000534208 66.8161 2.68681 64.1299 6.00048 64.1299H89.689C93.9241 64.1299 96.8262 68.399 95.2683 72.3371L88.6142 89.1574C87.7086 91.4465 85.4967 92.9502 83.0349 92.9502H55.3671C50.1402 92.9502 47.4127 99.1691 50.9532 103.014L104.672 161.357C106.592 163.442 106.791 166.586 105.15 168.896L85.3447 196.776C84.2194 198.36 82.3965 199.301 80.4533 199.301H20.8632C19.0073 199.301 17.256 198.442 16.1196 196.975L1.257 177.786C0.442542 176.734 0.00058148 175.442 0.00058148 174.112V170.933Z"
        fill="currentColor"
      />
      <path
        d="M129.557 70.1299C129.557 66.8162 132.243 64.1299 135.557 64.1299H165.421C168.735 64.1299 171.421 66.8162 171.421 70.1299V173.866C171.421 175.346 170.875 176.773 169.887 177.874L152.5 197.454C151.362 198.723 149.686 199.301 147.982 199.301H84.3709C82.0486 199.301 79.9348 197.961 78.9442 195.861L68.3944 173.493C66.5173 169.513 69.4208 164.933 73.8211 164.933H123.557C126.871 164.933 129.557 162.247 129.557 158.933V70.1299Z"
        fill="currentColor"
      />
      <path
        d="M8.92669 8.97638C8.92669 5.50924 11.8568 2.76374 15.3166 2.98905L156.872 12.2076C160.028 12.4131 162.482 15.0326 162.482 18.1949V37.9275C162.482 41.2412 159.796 43.9275 156.482 43.9275H14.9267C11.613 43.9275 8.92669 41.2412 8.92669 37.9275V8.97638Z"
        fill="currentColor"
      />
      <path
        d="M153 196.301C153 201.547 122.331 205.801 84.5 205.801C46.6685 205.801 16 201.547 16 196.301C16 191.054 46.6685 186.801 84.5 186.801C122.331 186.801 153 191.054 153 196.301Z"
        fill="currentColor"
      />
      <path
        d="M161 41.3008C161 46.5475 127.197 50.8008 85.5 50.8008C43.8025 50.8008 10.5 46.5475 10.5 41.3008C10.5 36.0541 43.8025 31.8008 85.5 31.8008C127.197 31.8008 161 36.0541 161 41.3008Z"
        fill="currentColor"
      />
      <path
        d="M159.829 14.0326C159.695 16.2803 151.739 17.9683 137.709 18.7261C123.679 19.4838 104.72 19.2494 84.9946 18.0744C65.2693 16.8993 46.3892 14.8795 32.4987 12.4585C18.6081 10.0374 10.8421 7.41287 10.9055 5.16096C10.9689 2.90905 18.8564 1.2138 32.8367 0.447324C46.817 -0.319151 65.7477 -0.0942147 85.4732 1.07276C105.199 2.23973 124.107 4.25338 138.048 6.67168C151.989 9.08999 159.823 11.7153 159.831 13.9714L85.3679 9.58151L159.829 14.0326Z"
        fill="currentColor"
      />
    </svg>
    Support on Soljar
  </button>
</a>`,
      previewStyle: `
  .preview-button-purple {
    padding: 12px 24px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s ease;
    background-color: #7C3AED;
    color: white;
    box-shadow: 0 2px 4px rgba(124, 58, 237, 0.1);
  }
  .preview-button-purple:hover {
    transform: translateY(-1px);
    background-color: #6D28D9;
    box-shadow: 0 4px 8px rgba(124, 58, 237, 0.2);
  }
  .preview-button-purple:active {
    transform: translateY(1px);
  }`,
      preview: {
        className: "preview-button-purple",
        text: "Support on Soljar",
      },
    },
    {
      title: "Orange Gradient Button",
      code: `<a href="https://soljar.xyz/${user.username}" target="_blank" style="text-decoration: none;">
  <button style="padding: 12px 24px; border-radius: 8px; border: none; cursor: pointer; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; font-weight: 500; display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s ease; background: linear-gradient(135deg, #F97316 0%, #FB923C 100%); color: white; box-shadow: 0 2px 4px rgba(249, 115, 22, 0.1); hover: { transform: translateY(-1px); box-shadow: 0 4px 8px rgba(249, 115, 22, 0.2); filter: brightness(110%); }">
  <svg
      width="17"
      height="20"
      viewBox="0 0 172 206"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.00058148 170.933C0.00058148 167.62 2.68687 164.933 6.00058 164.933H40.6692C45.7199 164.933 48.5107 159.074 45.328 155.152L1.34123 100.954C0.473539 99.8847 -2.42299e-05 98.5497 9.31323e-10 97.1727L0.000475895 70.1298C0.000534208 66.8161 2.68681 64.1299 6.00048 64.1299H89.689C93.9241 64.1299 96.8262 68.399 95.2683 72.3371L88.6142 89.1574C87.7086 91.4465 85.4967 92.9502 83.0349 92.9502H55.3671C50.1402 92.9502 47.4127 99.1691 50.9532 103.014L104.672 161.357C106.592 163.442 106.791 166.586 105.15 168.896L85.3447 196.776C84.2194 198.36 82.3965 199.301 80.4533 199.301H20.8632C19.0073 199.301 17.256 198.442 16.1196 196.975L1.257 177.786C0.442542 176.734 0.00058148 175.442 0.00058148 174.112V170.933Z"
        fill="currentColor"
      />
      <path
        d="M129.557 70.1299C129.557 66.8162 132.243 64.1299 135.557 64.1299H165.421C168.735 64.1299 171.421 66.8162 171.421 70.1299V173.866C171.421 175.346 170.875 176.773 169.887 177.874L152.5 197.454C151.362 198.723 149.686 199.301 147.982 199.301H84.3709C82.0486 199.301 79.9348 197.961 78.9442 195.861L68.3944 173.493C66.5173 169.513 69.4208 164.933 73.8211 164.933H123.557C126.871 164.933 129.557 162.247 129.557 158.933V70.1299Z"
        fill="currentColor"
      />
      <path
        d="M8.92669 8.97638C8.92669 5.50924 11.8568 2.76374 15.3166 2.98905L156.872 12.2076C160.028 12.4131 162.482 15.0326 162.482 18.1949V37.9275C162.482 41.2412 159.796 43.9275 156.482 43.9275H14.9267C11.613 43.9275 8.92669 41.2412 8.92669 37.9275V8.97638Z"
        fill="currentColor"
      />
      <path
        d="M153 196.301C153 201.547 122.331 205.801 84.5 205.801C46.6685 205.801 16 201.547 16 196.301C16 191.054 46.6685 186.801 84.5 186.801C122.331 186.801 153 191.054 153 196.301Z"
        fill="currentColor"
      />
      <path
        d="M161 41.3008C161 46.5475 127.197 50.8008 85.5 50.8008C43.8025 50.8008 10.5 46.5475 10.5 41.3008C10.5 36.0541 43.8025 31.8008 85.5 31.8008C127.197 31.8008 161 36.0541 161 41.3008Z"
        fill="currentColor"
      />
      <path
        d="M159.829 14.0326C159.695 16.2803 151.739 17.9683 137.709 18.7261C123.679 19.4838 104.72 19.2494 84.9946 18.0744C65.2693 16.8993 46.3892 14.8795 32.4987 12.4585C18.6081 10.0374 10.8421 7.41287 10.9055 5.16096C10.9689 2.90905 18.8564 1.2138 32.8367 0.447324C46.817 -0.319151 65.7477 -0.0942147 85.4732 1.07276C105.199 2.23973 124.107 4.25338 138.048 6.67168C151.989 9.08999 159.823 11.7153 159.831 13.9714L85.3679 9.58151L159.829 14.0326Z"
        fill="currentColor"
      />
    </svg>
    Tip with Soljar
    </button>
</a>`,
      previewStyle: `
  .preview-button-orange {
    padding: 12px 24px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s ease;
    background: linear-gradient(135deg, #F97316 0%, #FB923C 100%);
    color: white;
    box-shadow: 0 2px 4px rgba(249, 115, 22, 0.1);
  }
  .preview-button-orange:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(249, 115, 22, 0.2);
    filter: brightness(110%);
  }
  .preview-button-orange:active {
    transform: translateY(1px);
  }`,
      preview: {
        className: "preview-button-orange",
        text: "Tip with Soljar",
      },
    },
    {
      title: "Blue Gradient Button",
      code: `<a href="https://soljar.xyz/${user.username}" target="_blank" style="text-decoration: none;">
  <button style="padding: 12px 24px; border-radius: 8px; border: none; cursor: pointer; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; font-weight: 500; display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s ease; background: linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%); color: white; box-shadow: 0 2px 4px rgba(14, 165, 233, 0.1); hover: { transform: translateY(-1px); box-shadow: 0 4px 8px rgba(14, 165, 233, 0.2); filter: brightness(110%); }">
  <svg
      width="17"
      height="20"
      viewBox="0 0 172 206"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.00058148 170.933C0.00058148 167.62 2.68687 164.933 6.00058 164.933H40.6692C45.7199 164.933 48.5107 159.074 45.328 155.152L1.34123 100.954C0.473539 99.8847 -2.42299e-05 98.5497 9.31323e-10 97.1727L0.000475895 70.1298C0.000534208 66.8161 2.68681 64.1299 6.00048 64.1299H89.689C93.9241 64.1299 96.8262 68.399 95.2683 72.3371L88.6142 89.1574C87.7086 91.4465 85.4967 92.9502 83.0349 92.9502H55.3671C50.1402 92.9502 47.4127 99.1691 50.9532 103.014L104.672 161.357C106.592 163.442 106.791 166.586 105.15 168.896L85.3447 196.776C84.2194 198.36 82.3965 199.301 80.4533 199.301H20.8632C19.0073 199.301 17.256 198.442 16.1196 196.975L1.257 177.786C0.442542 176.734 0.00058148 175.442 0.00058148 174.112V170.933Z"
        fill="currentColor"
      />
      <path
        d="M129.557 70.1299C129.557 66.8162 132.243 64.1299 135.557 64.1299H165.421C168.735 64.1299 171.421 66.8162 171.421 70.1299V173.866C171.421 175.346 170.875 176.773 169.887 177.874L152.5 197.454C151.362 198.723 149.686 199.301 147.982 199.301H84.3709C82.0486 199.301 79.9348 197.961 78.9442 195.861L68.3944 173.493C66.5173 169.513 69.4208 164.933 73.8211 164.933H123.557C126.871 164.933 129.557 162.247 129.557 158.933V70.1299Z"
        fill="currentColor"
      />
      <path
        d="M8.92669 8.97638C8.92669 5.50924 11.8568 2.76374 15.3166 2.98905L156.872 12.2076C160.028 12.4131 162.482 15.0326 162.482 18.1949V37.9275C162.482 41.2412 159.796 43.9275 156.482 43.9275H14.9267C11.613 43.9275 8.92669 41.2412 8.92669 37.9275V8.97638Z"
        fill="currentColor"
      />
      <path
        d="M153 196.301C153 201.547 122.331 205.801 84.5 205.801C46.6685 205.801 16 201.547 16 196.301C16 191.054 46.6685 186.801 84.5 186.801C122.331 186.801 153 191.054 153 196.301Z"
        fill="currentColor"
      />
      <path
        d="M161 41.3008C161 46.5475 127.197 50.8008 85.5 50.8008C43.8025 50.8008 10.5 46.5475 10.5 41.3008C10.5 36.0541 43.8025 31.8008 85.5 31.8008C127.197 31.8008 161 36.0541 161 41.3008Z"
        fill="currentColor"
      />
      <path
        d="M159.829 14.0326C159.695 16.2803 151.739 17.9683 137.709 18.7261C123.679 19.4838 104.72 19.2494 84.9946 18.0744C65.2693 16.8993 46.3892 14.8795 32.4987 12.4585C18.6081 10.0374 10.8421 7.41287 10.9055 5.16096C10.9689 2.90905 18.8564 1.2138 32.8367 0.447324C46.817 -0.319151 65.7477 -0.0942147 85.4732 1.07276C105.199 2.23973 124.107 4.25338 138.048 6.67168C151.989 9.08999 159.823 11.7153 159.831 13.9714L85.3679 9.58151L159.829 14.0326Z"
        fill="currentColor"
      />
    </svg>
    Support Creator
    </button>
</a>`,
      previewStyle: `
  .preview-button-blue {
    padding: 12px 24px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s ease;
    background: linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%);
    color: white;
    box-shadow: 0 2px 4px rgba(14, 165, 233, 0.1);
  }
  .preview-button-blue:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(14, 165, 233, 0.2);
    filter: brightness(110%);
  }
  .preview-button-blue:active {
    transform: translateY(1px);
  }`,
      preview: {
        className: "preview-button-blue",
        text: "Support Creator",
      },
    },
    {
      title: "Green Gradient Button",
      code: `<a href="https://soljar.xyz/${user.username}" target="_blank" style="text-decoration: none;">
  <button style="padding: 12px 24px; border-radius: 8px; border: none; cursor: pointer; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; font-weight: 500; display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s ease; background: linear-gradient(135deg, #059669 0%, #10B981 100%); color: white; box-shadow: 0 2px 4px rgba(5, 150, 105, 0.1); hover: { transform: translateY(-1px); box-shadow: 0 4px 8px rgba(5, 150, 105, 0.2); filter: brightness(110%); }">
  <svg
      width="17"
      height="20"
      viewBox="0 0 172 206"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.00058148 170.933C0.00058148 167.62 2.68687 164.933 6.00058 164.933H40.6692C45.7199 164.933 48.5107 159.074 45.328 155.152L1.34123 100.954C0.473539 99.8847 -2.42299e-05 98.5497 9.31323e-10 97.1727L0.000475895 70.1298C0.000534208 66.8161 2.68681 64.1299 6.00048 64.1299H89.689C93.9241 64.1299 96.8262 68.399 95.2683 72.3371L88.6142 89.1574C87.7086 91.4465 85.4967 92.9502 83.0349 92.9502H55.3671C50.1402 92.9502 47.4127 99.1691 50.9532 103.014L104.672 161.357C106.592 163.442 106.791 166.586 105.15 168.896L85.3447 196.776C84.2194 198.36 82.3965 199.301 80.4533 199.301H20.8632C19.0073 199.301 17.256 198.442 16.1196 196.975L1.257 177.786C0.442542 176.734 0.00058148 175.442 0.00058148 174.112V170.933Z"
        fill="currentColor"
      />
      <path
        d="M129.557 70.1299C129.557 66.8162 132.243 64.1299 135.557 64.1299H165.421C168.735 64.1299 171.421 66.8162 171.421 70.1299V173.866C171.421 175.346 170.875 176.773 169.887 177.874L152.5 197.454C151.362 198.723 149.686 199.301 147.982 199.301H84.3709C82.0486 199.301 79.9348 197.961 78.9442 195.861L68.3944 173.493C66.5173 169.513 69.4208 164.933 73.8211 164.933H123.557C126.871 164.933 129.557 162.247 129.557 158.933V70.1299Z"
        fill="currentColor"
      />
      <path
        d="M8.92669 8.97638C8.92669 5.50924 11.8568 2.76374 15.3166 2.98905L156.872 12.2076C160.028 12.4131 162.482 15.0326 162.482 18.1949V37.9275C162.482 41.2412 159.796 43.9275 156.482 43.9275H14.9267C11.613 43.9275 8.92669 41.2412 8.92669 37.9275V8.97638Z"
        fill="currentColor"
      />
      <path
        d="M153 196.301C153 201.547 122.331 205.801 84.5 205.801C46.6685 205.801 16 201.547 16 196.301C16 191.054 46.6685 186.801 84.5 186.801C122.331 186.801 153 191.054 153 196.301Z"
        fill="currentColor"
      />
      <path
        d="M161 41.3008C161 46.5475 127.197 50.8008 85.5 50.8008C43.8025 50.8008 10.5 46.5475 10.5 41.3008C10.5 36.0541 43.8025 31.8008 85.5 31.8008C127.197 31.8008 161 36.0541 161 41.3008Z"
        fill="currentColor"
      />
      <path
        d="M159.829 14.0326C159.695 16.2803 151.739 17.9683 137.709 18.7261C123.679 19.4838 104.72 19.2494 84.9946 18.0744C65.2693 16.8993 46.3892 14.8795 32.4987 12.4585C18.6081 10.0374 10.8421 7.41287 10.9055 5.16096C10.9689 2.90905 18.8564 1.2138 32.8367 0.447324C46.817 -0.319151 65.7477 -0.0942147 85.4732 1.07276C105.199 2.23973 124.107 4.25338 138.048 6.67168C151.989 9.08999 159.823 11.7153 159.831 13.9714L85.3679 9.58151L159.829 14.0326Z"
        fill="currentColor"
      />
    </svg>
    Fund Project
    </button>
</a>`,
      previewStyle: `
  .preview-button-green {
    padding: 12px 24px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s ease;
    background: linear-gradient(135deg, #059669 0%, #10B981 100%);
    color: white;
    box-shadow: 0 2px 4px rgba(5, 150, 105, 0.1);
  }
  .preview-button-green:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(5, 150, 105, 0.2);
    filter: brightness(110%);
  }
  .preview-button-green:active {
    transform: translateY(1px);
  }`,
      preview: {
        className: "preview-button-green",
        text: "Fund Project",
      },
    },
    {
      title: "Dark Button",
      code: `<a href="https://soljar.xyz/${user.username}" target="_blank" style="text-decoration: none;">
  <button style="padding: 12px 24px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.1); cursor: pointer; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; font-weight: 500; display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s ease; background-color: #1E293B; color: white; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); hover: { transform: translateY(-1px); background-color: #334155; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); }">
  <svg
      width="17"
      height="20"
      viewBox="0 0 172 206"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.00058148 170.933C0.00058148 167.62 2.68687 164.933 6.00058 164.933H40.6692C45.7199 164.933 48.5107 159.074 45.328 155.152L1.34123 100.954C0.473539 99.8847 -2.42299e-05 98.5497 9.31323e-10 97.1727L0.000475895 70.1298C0.000534208 66.8161 2.68681 64.1299 6.00048 64.1299H89.689C93.9241 64.1299 96.8262 68.399 95.2683 72.3371L88.6142 89.1574C87.7086 91.4465 85.4967 92.9502 83.0349 92.9502H55.3671C50.1402 92.9502 47.4127 99.1691 50.9532 103.014L104.672 161.357C106.592 163.442 106.791 166.586 105.15 168.896L85.3447 196.776C84.2194 198.36 82.3965 199.301 80.4533 199.301H20.8632C19.0073 199.301 17.256 198.442 16.1196 196.975L1.257 177.786C0.442542 176.734 0.00058148 175.442 0.00058148 174.112V170.933Z"
        fill="currentColor"
      />
      <path
        d="M129.557 70.1299C129.557 66.8162 132.243 64.1299 135.557 64.1299H165.421C168.735 64.1299 171.421 66.8162 171.421 70.1299V173.866C171.421 175.346 170.875 176.773 169.887 177.874L152.5 197.454C151.362 198.723 149.686 199.301 147.982 199.301H84.3709C82.0486 199.301 79.9348 197.961 78.9442 195.861L68.3944 173.493C66.5173 169.513 69.4208 164.933 73.8211 164.933H123.557C126.871 164.933 129.557 162.247 129.557 158.933V70.1299Z"
        fill="currentColor"
      />
      <path
        d="M8.92669 8.97638C8.92669 5.50924 11.8568 2.76374 15.3166 2.98905L156.872 12.2076C160.028 12.4131 162.482 15.0326 162.482 18.1949V37.9275C162.482 41.2412 159.796 43.9275 156.482 43.9275H14.9267C11.613 43.9275 8.92669 41.2412 8.92669 37.9275V8.97638Z"
        fill="currentColor"
      />
      <path
        d="M153 196.301C153 201.547 122.331 205.801 84.5 205.801C46.6685 205.801 16 201.547 16 196.301C16 191.054 46.6685 186.801 84.5 186.801C122.331 186.801 153 191.054 153 196.301Z"
        fill="currentColor"
      />
      <path
        d="M161 41.3008C161 46.5475 127.197 50.8008 85.5 50.8008C43.8025 50.8008 10.5 46.5475 10.5 41.3008C10.5 36.0541 43.8025 31.8008 85.5 31.8008C127.197 31.8008 161 36.0541 161 41.3008Z"
        fill="currentColor"
      />
      <path
        d="M159.829 14.0326C159.695 16.2803 151.739 17.9683 137.709 18.7261C123.679 19.4838 104.72 19.2494 84.9946 18.0744C65.2693 16.8993 46.3892 14.8795 32.4987 12.4585C18.6081 10.0374 10.8421 7.41287 10.9055 5.16096C10.9689 2.90905 18.8564 1.2138 32.8367 0.447324C46.817 -0.319151 65.7477 -0.0942147 85.4732 1.07276C105.199 2.23973 124.107 4.25338 138.048 6.67168C151.989 9.08999 159.823 11.7153 159.831 13.9714L85.3679 9.58151L159.829 14.0326Z"
        fill="currentColor"
      />
    </svg>
    Send Tip
  </button>
</a>`,
      previewStyle: `
  .preview-button-dark {
    padding: 12px 24px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    cursor: pointer;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s ease;
    background-color: #1E293B;
    color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .preview-button-dark:hover {
    transform: translateY(-1px);
    background-color: #334155;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  .preview-button-dark:active {
    transform: translateY(1px);
  }`,
      preview: {
        className: "preview-button-dark",
        text: "Send Tip",
      },
    },
    {
      title: "Light Button",
      code: `<a href="https://soljar.xyz/${user.username}" target="_blank" style="text-decoration: none;">
  <button style="padding: 12px 24px; border-radius: 8px; border: none; cursor: pointer; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; font-weight: 500; display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s ease; background-color: rgba(124, 58, 237, 0.1); color: #7C3AED; hover: { transform: translateY(-1px); background-color: rgba(124, 58, 237, 0.15); }">
 <svg
      width="17"
      height="20"
      viewBox="0 0 172 206"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.00058148 170.933C0.00058148 167.62 2.68687 164.933 6.00058 164.933H40.6692C45.7199 164.933 48.5107 159.074 45.328 155.152L1.34123 100.954C0.473539 99.8847 -2.42299e-05 98.5497 9.31323e-10 97.1727L0.000475895 70.1298C0.000534208 66.8161 2.68681 64.1299 6.00048 64.1299H89.689C93.9241 64.1299 96.8262 68.399 95.2683 72.3371L88.6142 89.1574C87.7086 91.4465 85.4967 92.9502 83.0349 92.9502H55.3671C50.1402 92.9502 47.4127 99.1691 50.9532 103.014L104.672 161.357C106.592 163.442 106.791 166.586 105.15 168.896L85.3447 196.776C84.2194 198.36 82.3965 199.301 80.4533 199.301H20.8632C19.0073 199.301 17.256 198.442 16.1196 196.975L1.257 177.786C0.442542 176.734 0.00058148 175.442 0.00058148 174.112V170.933Z"
        fill="currentColor"
      />
      <path
        d="M129.557 70.1299C129.557 66.8162 132.243 64.1299 135.557 64.1299H165.421C168.735 64.1299 171.421 66.8162 171.421 70.1299V173.866C171.421 175.346 170.875 176.773 169.887 177.874L152.5 197.454C151.362 198.723 149.686 199.301 147.982 199.301H84.3709C82.0486 199.301 79.9348 197.961 78.9442 195.861L68.3944 173.493C66.5173 169.513 69.4208 164.933 73.8211 164.933H123.557C126.871 164.933 129.557 162.247 129.557 158.933V70.1299Z"
        fill="currentColor"
      />
      <path
        d="M8.92669 8.97638C8.92669 5.50924 11.8568 2.76374 15.3166 2.98905L156.872 12.2076C160.028 12.4131 162.482 15.0326 162.482 18.1949V37.9275C162.482 41.2412 159.796 43.9275 156.482 43.9275H14.9267C11.613 43.9275 8.92669 41.2412 8.92669 37.9275V8.97638Z"
        fill="currentColor"
      />
      <path
        d="M153 196.301C153 201.547 122.331 205.801 84.5 205.801C46.6685 205.801 16 201.547 16 196.301C16 191.054 46.6685 186.801 84.5 186.801C122.331 186.801 153 191.054 153 196.301Z"
        fill="currentColor"
      />
      <path
        d="M161 41.3008C161 46.5475 127.197 50.8008 85.5 50.8008C43.8025 50.8008 10.5 46.5475 10.5 41.3008C10.5 36.0541 43.8025 31.8008 85.5 31.8008C127.197 31.8008 161 36.0541 161 41.3008Z"
        fill="currentColor"
      />
      <path
        d="M159.829 14.0326C159.695 16.2803 151.739 17.9683 137.709 18.7261C123.679 19.4838 104.72 19.2494 84.9946 18.0744C65.2693 16.8993 46.3892 14.8795 32.4987 12.4585C18.6081 10.0374 10.8421 7.41287 10.9055 5.16096C10.9689 2.90905 18.8564 1.2138 32.8367 0.447324C46.817 -0.319151 65.7477 -0.0942147 85.4732 1.07276C105.199 2.23973 124.107 4.25338 138.048 6.67168C151.989 9.08999 159.823 11.7153 159.831 13.9714L85.3679 9.58151L159.829 14.0326Z"
        fill="currentColor"
      />
    </svg>
    Tip
  </button>
</a>`,
      previewStyle: `
  .preview-button-light {
    padding: 12px 24px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s ease;
    background-color: rgba(124, 58, 237, 0.1);
    color: #7C3AED;
  }
  .preview-button-light:hover {
    transform: translateY(-1px);
    background-color: rgba(124, 58, 237, 0.15);
  }
  .preview-button-light:active {
    transform: translateY(1px);
  }`,
      preview: {
        className: "preview-button-light",
        text: "Tip",
      },
    },
  ];

  return (
    <div className="container mx-auto p-8 px-4 sm:px-6">
      <style>
        {buttonExamples.map((example) => example.previewStyle).join("\n")}
      </style>
      <div className="space-y-8">
        <div className="flex items-center gap-3 text-2xl font-medium">
          <Settings className="w-7 h-7 text-accent-purple" />
          More
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Info Card */}
          <Card className="group relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] transition-colors" />
            <div className="absolute h-32 w-32 -top-16 -right-16 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 group-hover:scale-150 transition-all duration-500" />

            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Info
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={user?.username}
                  readOnly
                  className="bg-purple-500/5 border-purple-500/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wallet">Wallet</Label>
                <Input
                  id="wallet"
                  type="text"
                  value={user?.user.toBase58()}
                  readOnly
                  className="bg-purple-500/5 border-purple-500/20"
                />
              </div>
            </CardContent>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </Card>
          {/* Platform Links Card */}
          <Card className="group relative overflow-hidden">
            {/* <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] transition-colors" /> */}
            <div className="absolute h-32 w-32 -top-16 -right-16 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 group-hover:scale-150 transition-all duration-500" />

            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Platform Links
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Follow Us</Label>
                  <p className="text-sm text-muted-foreground">
                    <Button
                      variant="link"
                      className="text-blue-500 hover:text-blue-600 p-0 h-auto font-normal"
                      onClick={() =>
                        window.open("https://x.com/soljar_xyz", "_blank")
                      }
                    >
                      @soljar_xyz
                    </Button>
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Refer Friends</Label>
                  <p className="text-sm text-muted-foreground">
                    Share Soljar with your friends.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-500/20 hover:bg-blue-500/10"
                  onClick={() =>
                    copyToClipboard(
                      "https://soljar.xyz?ref=" + user.username,
                      -1
                    )
                  }
                >
                  {copiedIndex === -1 ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Documentation</Label>
                  <p className="text-sm text-muted-foreground">
                    <Button
                      variant="link"
                      className="text-blue-500 hover:text-blue-600 p-0 h-auto font-normal"
                      onClick={() =>
                        window.open("https://docs.soljar.xyz", "_blank")
                      }
                    >
                      Learn more about Soljar
                    </Button>
                  </p>
                </div>
              </div>
            </CardContent>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </Card>
        </div>

        <h2 className="text-2xl font-medium mt-6 mb-4">
          Embed Soljar Anywhere
        </h2>
        <p className="text-muted-foreground">
          Copy and paste these snippets to add Soljar tipping to any platform.
        </p>

        <div className="grid grid-cols-1 gap-6">
          {buttonExamples.map((example, index) => (
            <Card key={index} className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] transition-colors" />
              <div className="absolute h-32 w-32 -top-16 -right-16 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 group-hover:scale-150 transition-all duration-500" />

              <CardHeader>
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  {example.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Button Preview */}
                <div className="mb-4">
                  <Label>Preview</Label>
                  <div className="mt-2">
                    <button className={example.preview.className}>
                      <ButtonLogo />
                      {example.preview.text}
                    </button>
                  </div>
                </div>

                {/* Code Block */}
                <div className="relative">
                  <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto max-h-[300px] overflow-y-auto">
                    <code>{example.code}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(example.code, index)}
                  >
                    {copiedIndex === index ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

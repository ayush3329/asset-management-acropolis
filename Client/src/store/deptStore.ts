"use client";
import { create } from "zustand";
import { produce } from "immer";

type DeptData = {
  name: string;
  email: string;
  phone: string;
  id: string;
};

type DeptState = {
  deptDetails: DeptData[];

  addDeptData: (payload: DeptData) => void;
  setDeptData: (payload: DeptData) => void;
};

const initialState = {
  deptDetails: [],
};

export const useDeptStore = create<DeptState>((set) => ({
  ...initialState,

  addDeptData: (data) => {
    set(
      produce((state) => {
        state.deptDetails.push(data);
      })
    );
  },

  setDeptData: (data) => {
    set(
      produce((state) => {
        state.deptDetails = data;
      })
    );
  },
}));

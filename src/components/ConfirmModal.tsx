"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ConfirmModalProps {
  title: string;
  description: string;
  openModalConfirm: boolean;
  setOpenModalConfirm: (value: boolean) => void;
  handleSubmit: () => void;
}

export const ConfirmModal = ({
  title,
  description,
  openModalConfirm,
  setOpenModalConfirm,
  handleSubmit,
}: ConfirmModalProps) => {
  return (
    <Dialog open={openModalConfirm} onOpenChange={setOpenModalConfirm}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-end">
          <Button
            variant="secondary"
            onClick={() => setOpenModalConfirm(false)}
          >
            취소
          </Button>
          <Button variant="default" onClick={handleSubmit}>
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
